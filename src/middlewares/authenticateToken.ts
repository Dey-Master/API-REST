import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Role } from '../../generated/prisma/enums';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ message: 'Token não fornecido.' });
        
        const token = authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Token não encontrado.' });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as 
            {id: string, sub: string, role: Role};
        
        req.user = {id: decoded.sub, role: decoded.role};
        console.log(`Decoded: ${decoded.sub} ${decoded.role}`);

        return next();

    } catch (error) {
        return res.status(403).json({ message: 'Token inválido.' });
    }
};