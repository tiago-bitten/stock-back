import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

enum Permissions {
    READ = 'read',
    WRITE = 'write',
    DELETE = 'delete',
    SHARE = 'share',
    UPLOAD_FILES = 'upload_files',
}

export default function authMiddleware () {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.userId;

        console.log('userId =', userId);

        console.log('req.path =', req.path);

        next();
    }
}