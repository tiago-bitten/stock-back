import { Request, Response, NextFunction } from 'express';
import UserRepository from '../repositories/UserRepository';

class UserController {

    static getUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
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
    }
}

export default UserController;