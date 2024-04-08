import { Request, Response, NextFunction } from 'express';
import { BaseEntity } from 'typeorm';

class AuthController extends BaseEntity {
    static authenticate(req: Request, res: Response, next: NextFunction) {
        res.send('Authenticate user');
    }
}

export default AuthController;