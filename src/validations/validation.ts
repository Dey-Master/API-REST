import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';


// Middleware de validação genérica
export const validate = (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          errors: error.issues.map(err => ({
            field: err.path[0],
            message: err.message
          }))
        });
      }

      return res.status(400).json({
        error: 'Erro de validação'
      });
    }
};




// Esquema de validação para registro
export const registerSchema = z.object({
    firstname: z.string().trim()
    .min(3, { message: "Mínimo 3 caracteres!" })
    .max(100, { message: "Máximo 100 caracteres!" })
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, 
        { message: "O nome deve conter apenas letras!" }),
    
    lastname: z.string().trim()
    .min(3, { message: "Mínimo 3 caracteres!" })
    .max(100, { message: "Máximo 100 caracteres!" })
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, 
        { message: "O sobrenome deve conter apenas letras!" }),

    email: z.string().trim().toLowerCase()
    .min(3, { message: 'O E-mail deve ter pelo menos 3 caracteres!' })
    .email({ message:'Formato do e-mail inválido' }),

    password: z.string().trim()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        {message: "A senha deve conter letras maiúscula, minúscula, número e caractere especial."})
    .min(6, 
        { message:'A senha deve ter pelo menos 6 dígitos!' })
});




// Esquema de validação para login
export const loginSchema = z.object({
    email: z.string().trim().toLowerCase()
    .min(3, { message: 'O E-mail deve ter pelo menos 3 caracteres!' })
    .email({ message:'Formato do e-mail inválido' }),

    password: z.string().trim()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        { message: "A senha deve conter letras maiúscula, minúscula, número e caractere especial." })
    .min(6, 
        { message:'A senha deve ter pelo menos 6 dígitos' })
});




// Esquema de validação para solicitar nova senha
export const fogortPasswordSchema = z.object({
    email: z.string().trim().toLowerCase()
    .min(3, { message: 'O E-mail deve ter pelo menos 3 caracteres!' })
    .email({ message:'Formato do e-mail inválido' }),
});




// Esquema de validação para atualizar a senha
export const resetPasswordSchema = z.object({
    password: z.string().trim()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        { message: "A senha deve conter letras maiúscula, minúscula, número e caractere especial." })
    .min(6, 
        { message:'A senha deve ter pelo menos 6 dígitos' })
});


