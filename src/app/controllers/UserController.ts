import { Request, Response, NextFunction } from 'express';
import UserRepository from '../repositories/UserRepository';

class UserController {

    public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
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
    };

    public storeUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const userRepository = UserRepository;

        const { name, email, password, CPF } = req.body;

        if (!name || !email || !password || !CPF) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const userExists = await userRepository.getUserByEmail(email);

        if (userExists != null) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const newUser = await userRepository.createNewUser(
            { name, email, password, CPF }
        );

        return res.status(201).json({
            message: 'User created successfully',
            user: newUser
        });
    };
}

export default new UserController;