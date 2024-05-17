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

            const { nome, email, senha, cpf, empresa } = req.body;

            if (!nome || !email || !senha || !cpf || !empresa) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const userExists = await userRepository.getUser(email);

            if (userExists != null) {
                return res.status(409).json({ message: 'User already exists' });
            }

            const companyExists = await empresaRepository.getCompany({id: empresa});

            if (companyExists == null) {
                return res.status(404).json({ message: 'Company not found, please, request an invite from an admin' });
            }

            const newUser = await userRepository.createNewUser(
                { nome, email, senha, cpf, empresa }
            );

            if (!newUser) {
                return res.status(500).json({ message: 'Error while creating user' });
            }

            return res.status(201).json({
                message: 'User created successfully'
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