import 'dotenv/config';
import rateLimit from "express-rate-limit";

// limita quantas requisições um IP pode fazer em um período.
export const authLimiter = rateLimit({
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS),
    max: Number(process.env.RATE_LIMIT_MAX_REQUESTS),
    message: {
        status: 429,
        message: 'Muitas tentativas. Tente novamente mais tarde.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});