import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { authenticateToken } from './middlewares/authenticateToken';
import publicRouter   from './routes/public.routes';
import privateRouter  from './routes/privete.routes';
import cookieParser from 'cookie-parser';

const server = express();

server.use(express.json({ limit: '10mb' }));

// Segurança - protege a API contra ataques comuns ajustando headers HTTP automaticamente.
server.use(helmet())

// É um logger de requisições HTTP. Ele mostra (método (GET, POST), rotas, status, tempo de resposta) 
server.use(morgan("dev"));

// Lê cookies enviados pelo navegador e disponibiliza em req.cookies
server.use(cookieParser());

// CORS - Para comunicação (requisões) entre diferentes dominios/server.
server.use(cors({
    origin: process.env.CORS_ORIGIN === "production" ? 
        process.env.CORS_ORIGIN_NODE_ENV : true,    
    credentials: true,
    methods:  ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
}));

// Rotas
server.use('/api', publicRouter);
server.use('/api/privete', authenticateToken, privateRouter);

export default server;