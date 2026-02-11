import 'express';
import { Role } from '../../generated/prisma/enums';

declare global {
  namespace Express {
    interface User {
      id: string;
      role: Role;
    }
    interface Request {
      user?: User
    }
  }
}
  

