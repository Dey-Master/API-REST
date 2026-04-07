import swaggerJsdoc from 'swagger-jsdoc';
import 'dotenv/config';


export const swaggerSpec = swaggerJsdoc ({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Authentication API',
            version: '1.0.0',
            description: `API RESTful de autenticação e gerenciamento de usuários (Não completo).`,
            contact: {
                name: 'Abednego Mayamba',
                url: 'https://github.com/Dey-Master'
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/license/mit/'
            }
        },
        servers: [
            {
                url: process.env.NODE_ENV === "production" ? process.env.CORS_ORIGIN_NODE_ENV : `http://${process.env.HOST}:${process.env.PORT}/`,
                description: 'development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                },
            },
        },
    },
    apis: ['./src/docs/*.ts']
});

