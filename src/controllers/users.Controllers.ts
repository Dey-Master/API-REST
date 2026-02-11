import { Request, Response } from "express";
import { prisma } from '../../lib/prisma';
import { Role } from "../../generated/prisma/enums";

//Apenas para mostrar a auth do admin em relação ao do user comun

export const getAllUser = async ( req: Request, res: Response) => {
    try {
        const user = await prisma.user.findMany({
            select:{
                id:true,
                firstname: true,
                lastname: true,
                role: true
        }})
        return res.status(200).json(user);
        
    } catch (error) {
        return res.status(400).json({ message: 'Erro ao buscar usuarios!' });
    }
}



export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id:string }
        const token = req.cookies.refreshToken;
        
        if (token) 
            await prisma.refreshToken.deleteMany({where:{ token }});

        const user = await prisma.user.delete({ where: {id} });

        return res.status(200).json({ message: 'Usuario deletado com sucesso!' });
        
    } catch (error) {
        return res.status(404).json({ message: 'Usuario não encntrado!' });
    }
}



export const getProfile = async (req: Request, res: Response ) => {
    try {

        const { id } = req.user as { id: string }

        const user = await prisma.user.findUnique({
            where: {
                id,
            },
            select:{
                firstname: true,
                lastname: true,
                email: true,
                role: true
            }}
        )
        return res.status(200).json(user);
        
    } catch (error) {
        return res.status(400).json({ message: 'Erro ao buscar dados do perfil!' });
    }
}


