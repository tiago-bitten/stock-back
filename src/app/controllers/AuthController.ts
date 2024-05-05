import { Request, Response, NextFunction } from 'express';
import UserRepository from '../repositories/UsuarioRepository';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
class AuthController {

    public authenticate = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const userRepository = UserRepository;    

        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ message: 'Email and password are required!' });
        }

        const user = await userRepository.getUser({email});

        console.log('user =', user)

        if (!user || user.senha == null) {
            return res.status(404).json({ message: 'User not found!' });
        }

        const isValidPassword = bcrypt.compare(senha, user.senha);

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password!' });
        }

        const token = jwt.sign(
            { id: user.id }, 
            'SECRET_KEY', 
            {expiresIn: '1h'}
        );

        delete user.senha;
        
        return res.status(200).json({
            message: 'User authenticated successfully',
            token: token,
            user: user
        });
    };

}

export default new AuthController;