import { Request, Response, NextFunction } from 'express';
import UsuarioRepository from '../repositories/UsuarioRepository';
import EmpresaRepository from '../repositories/EmpresaRepository';
import IUsuario from '../interfaces/IUsuario';

class UsuarioController {

    public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const users: IUsuario[] = await UsuarioRepository.getUsers();

            users.map(u => { delete u.senha; });

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
        try {
            const userRepository = UsuarioRepository;
            const empresaRepository = EmpresaRepository;

            const { nome, email, senha, cpf } = req.body;

            if (!nome || !email || !senha || !cpf) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const userExists = await userRepository.getUser(email);

            if (userExists != null) {
                return res.status(409).json({ message: 'User already exists' });
            }

            const newUser = await userRepository.createNewUser(
                { nome, email, senha, cpf }
            );

            if (!newUser) {
                return res.status(500).json({ message: 'Error while creating user' });
            }

            return res.status(201).json({
                message: 'User created successfully',
                user: newUser.id
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Internal server error',
                error: error
            });
        }
    }
}

export default new UsuarioController;