import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

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

            return next();
        } catch {
            return res.status(401).json({ error: 'Token invalid' });
        }
    };
}