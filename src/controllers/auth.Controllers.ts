import bcrypt from 'bcryptjs';
import { prisma } from '../../lib/prisma';
import { Request, Response } from 'express';
import  jwt  from 'jsonwebtoken';
import crypto from 'crypto'
import { sendMail } from '../services/mailerServices';


//Registro
export const register = async ( req: Request, res: Response )=> {
    try {
        const { email, password, firstname, lastname } = req.body as
         { email: string, password: string, firstname: string, lastname: string };
         
        const passwordHash = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                password: passwordHash,
                firstname,
                lastname,
                role: 'USER'
            }
        });

        return res.status(201).json({ message: "Usuário criado com sucesso!" })
    } catch (error) {
        return res.status(400).json({ error: "O e-mail encontra-se em uso!" });
    }
};



//Login
export const login = async ( req: Request, res: Response ) => {
   try {
     const { email, password } = req.body as 
    { email: string, password: string };

    const user =  await prisma.user.findUnique(
        {where: { email: email.toLowerCase() }
    });

    const isPasswordValid =  user ? await bcrypt.compare(password, user.password) : false;

    if (!user || !isPasswordValid) 
        return res.status(400).json({ error: "Credenciais inválidas." });

    const accesstoken = jwt.sign(
        { sub: user.id,
          role: user.role
        }, 
            process.env.JWT_SECRET as string,
         { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
        { sub: user.id },
            process.env.JWT_REFRESH_SECRET as string,
        { expiresIn: '7d' }
    );

    if (!process.env.JWT_SECRET) 
        throw new Error('JWT_SECRET não definido');


    await  prisma.refreshToken.create({
        data:{
            token: refreshToken,
            userId: user.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
    });
    
    res.cookie('refreshToken', refreshToken, {
       httpOnly: true,
       secure: false, // Muda para "true" para reconhecer o https, caso uses em produção. 
       sameSite: 'strict', // Muda 'strict' para 'none' caso o Frontend tenha um dominio diferente.
       path: '/'
    });

     res.status(200).json({ 
        message: "Login realizado com sucesso!",
        accessToken: accesstoken, 
        user: {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role
        }
     });
    
   } catch (error) {
     return res.status(400).json({ error: "Erro ao fazer login." });
   }
};



//Logout
export const logout = async ( req: Request, res: Response ) => {
    try {
        const token = req.cookies.refreshToken;
        
        if (token) 
            await prisma.refreshToken.deleteMany({where:{ token }});

        console.log(`Logout realizado com sucesso: ${token}`)
        
        res.clearCookie('refreshToken');
        res.sendStatus(204);

    } catch (error) {
        return res.status(400).json({ error: "Erro ao fazer logout." });
    }
};



//Solicitar novo token: (caso esteja dentro do prazo)
export const refreshToken = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.refreshToken;

        if(!token)
            return res.sendStatus(401);

        const existsToken = await prisma.refreshToken.findUnique({
            where: { token }
        });

        if(!existsToken)
            return res.sendStatus(403);

        const playload = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);

        const newAccessToken = jwt.sign(
            {sub: playload.sub},
                process.env.JWT_SECRET as string,
            { expiresIn: '15m' }
        );
            console.log(`newAccessToken criado com sucesso: ${newAccessToken}`);

        return res.status(200).json({ accessToken: newAccessToken });

    } catch (error) {
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};


//Solicitar nova senha
export const forgetPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body as {email:string};
        
        const user = await prisma.user.findUnique(
            {where:{ email: email.toLowerCase() }
        });

        if (!user) return res.status(404) //Aqui é proposital, é para não revelar ao usuario que o email existe ou não existe.
            .json({ message: 'Se o e-mail existir, enviaremos instruções.' });

        const resetToken = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 1000 * 60 * 15);

        const forgot = await prisma.resetPassword.create({
            data:{
                token: resetToken,
                userId: user.id,
                expiresAt
            }
        });

         await sendMail (
            user.email,
            "Redifinição de senha",
            `
                <h2>Olá, ${user.firstname} ${user.lastname} </h2>
                <p>Voce solicitou a redifinição da senha. Clique no link a abaixo para redifinir a senha:</p>

                <a href= "http://${process.env.HOST}:${process.env.PORT}/api/reset-password/${resetToken}"> 
                    Redifinir minha senha 
                </a>
                
                <p>O link expira em 15 minutos.</p>
            `
        );

        return res.status(200).json({ message: 'E-mail de redefinição enviado!' });
        
    } catch (error) {
        return res.status(500).json({ 'Erro ao enviar e-mail:': error });
    };
};


//Atualizar a senha
export const resetPassword = async ( req: Request, res: Response ) => {
    try {
        const { token } = req.params as { token: string };
        const { password } = req.body as { password: string };

        const resetToken =  await prisma.resetPassword.findUnique({ 
            where: { token }
        });

        if (!resetToken || resetToken.expiresAt < new Date())
            return res.status(400).json({ message: "Token inválido!" });

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await prisma.user.update({
            where: {
                id: resetToken.userId
            },
            data: {
                password: passwordHash
            }
        });

        await prisma.resetPassword.delete({where: { id: resetToken.id }})
        return res.status(200).json({ message: "Senha redifinida com sucesso!" })

    } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor" });
    };
};