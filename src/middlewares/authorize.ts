import { Request, Response, NextFunction } from "express";
import { Role } from "../../generated/prisma/enums";


export const authrize = (...role: Role[]) => {
    return ( req: Request, res: Response, next: NextFunction) => {
        
        try {
            if(!req.user)
                return res.status(401).json({ message: 'Usuário não autenticado.' });

            if(!role.includes(req.user.role))
                return res.status(403).json({ message: 'Acesso negado.' });

            return next()
        } catch (error) {
            return res.status(500).json({ message: 'Erro interno ao verificar permissões.' });
        }
    };
};