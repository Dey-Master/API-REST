import express from 'express';
import cors from 'cors';
import { authenticateToken } from './middlewares/middlewares';
import publicRouter   from './routes/public.routes';
import privateRouter  from './routes/privete.routes';
import cookieParser from 'cookie-parser';

const server = express();

server.use(express.json());
server.use(cookieParser());
server.use(cors({
    origin: true,    
    credentials: true,
    methods:  ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
}));


server.use('/api', publicRouter);
server.use('/api/privete', authenticateToken, privateRouter);

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8000

server.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}/`);
});