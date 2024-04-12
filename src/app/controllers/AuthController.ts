import { Request, Response, NextFunction } from 'express';
import UserRepository from '../repositories/UserRepository';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
class AuthController {

    public authenticate = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const userRepository = UserRepository;    

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required!' });
        }

        const user = await userRepository.getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password!' });
        }

        const token = jwt.sign(
            { id: user.id }, 
            'SECRET_KEY', 
            {expiresIn: '1h'}
        );

        return res.status(200).json({
            message: 'User authenticated successfully',
            token: token,
            user: user
        });
    };

}

export default new AuthController;