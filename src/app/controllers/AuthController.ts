import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import UserRepository from '../repositories/UsuarioRepository';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import AuthRepository from '../repositories/AuthRepository';
dotenv.config();

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

class AuthController {
    public logout = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
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

            AuthRepository.invalidateToken(token);

            return res.status(200).json({
                message: 'User logged out successfully!'
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error!',
                error: error
            });
        }
    };

    public authenticate = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const userRepository = UserRepository;    

            const { email, senha } = req.body;
    
            if (!email || !senha) {
                return res.status(400).json({ message: 'Email and password are required!' });
            }
    
            const user = await userRepository.getUserToLogin(email);
    
            if (!user || user.senha == null) {
                return res.status(404).json({ message: 'User not found!' });
            }
    
            const empresa: any = user.empresa;
            
            if (!empresa) {
                return res.status(401).json({ message: 'User not authorized!' });
            }
    
            const isValidPassword = await bcrypt.compare(senha, user.senha);
    
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Invalid password!' });
            }
    
            const token = jwt.sign(
                { id: user.id }, 
                'SECRET_KEY', 
                { expiresIn: '1h' }
            );
    
            return res.status(200).json({
                message: 'User authenticated successfully',
                token: token,
                usuario: user.id,
                empresa: empresa.id
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error!',
                error: error
            });
        }
    };

    public forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const userRepository = UserRepository;    

            const { email } = req.body;
    
            if (!email) {
                return res.status(400).json({ message: 'Please, provide an email!' });
            }
    
            const user = await userRepository.getUser({email});
    
            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }
    
            const token = jwt.sign(
                { id: user.id }, 
                'SECRET_KEY', 
                {expiresIn: '1h'}
            );
    
            const transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "bb13ec937a450a",
                    pass: "e0dc432b0a683f"
                }
            });
    
            transport.sendMail({
                from: 'Stock Sense <contato.gustavoneskovek@gmail.com>',
                to: user.email,
                subject: 'Password recovery',
                html: `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                        <title>StockSense Reset Password</title>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
                        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
                        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
                        </head>
                        <body>
    
                        <div class="jumbotron text-center">
                        <h2>Reset password</h2>
                        <p>Click on the link below to reset your password:</p>
                        <a class='btn btn-sm btn-primary' href='${process.env.GLOBAL_URL}/resetPassword?token=${token}' target='_blank'>Here</a>
                        </div>
    
                        </body>
                        </html>`,
                text: `Click on the link below to reset your password: ${process.env.GLOBAL_URL}/resetPassword?token=${token}`
            });
    
            return res.status(200).json({
                message: 'A link to reset your password has been sent to your email!'
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error!'
            });
        }
    };

    public resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const userRepository = UserRepository;
            
            const { senha } = req.body;

            if (!senha) {
                return res.status(400).json({ message: 'Please, provide a password!' });
            }

            const resetToken = req.query.token as string;

            if (!resetToken) {
                return res.status(400).json({ message: 'Token not provided!' });
            }

            const decoded = verify(resetToken, 'SECRET_KEY') as TokenPayload;
            const { id } = decoded;

            const user = await userRepository.getUserToLogin({ id: parseInt(id) });

            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }

            user.senha = senha;

            const updatedUser = await userRepository.updateUser(user);

            if (!updatedUser) {
                return res.status(500).json({ message: 'Error updating user password!' });
            }

            return res.status(200).json({
                message: 'Password restored with success!'
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Internal server error!', 
                error: error 
            });
        }
    };
}

export default new AuthController;