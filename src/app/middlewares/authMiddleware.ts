import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import UsuarioRepository from '../repositories/UsuarioRepository';

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export default function authMiddleware () {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: 'Token not provided' });
        }

        const parts = authHeader.split(' ');

        if (parts.length !== 2) {
            return res.status(401).json({ error: 'Token error' });
        }

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).json({ error: 'Token malformed' });
        }

        try {
            const decoded = verify(token, 'SECRET_KEY');
            const { id } = decoded as TokenPayload;

            req.userId = id;

            const userRole = await UsuarioRepository.getUserRole(parseInt(req.userId));
            const url = req.originalUrl.split('/');

            if (url[1] === 'usuario' && userRole !== 'ADMIN') {
                return res.status(401).json({ error: 'User access unauthorized!' });
            }

            return next();
        } catch {
            return res.status(401).json({ error: 'Token invalid' });
        }
    };
}