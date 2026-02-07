import { Request, Response, NextFunction } from "express";
import { Role } from "../../generated/prisma/enums";

export const authrize = (...role: Role[]) => {
    return ( req: Request, res: Response, next: NextFunction) => {
        
        if (!req.user || !role.includes(req.user.role as any))
            return res.sendStatus(403)

        return next()
    };
};