import { Request, Response, Router, NextFunction } from 'express';
import User from '../models/User';
import UserRepository from '../repositories/UserRepository';

const userRouter = Router();

userRouter.get('/', async (_req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const users = await UserRepository.getUsers();

        return res.status(200).send({
            users
        });
    } catch (error) {
        return res.status(500).json({ 
            message: 'Internal server error',
            error: error
        });
    }
});

export default userRouter;