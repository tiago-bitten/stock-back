import { Request, Response, NextFunction } from 'express';
import UsuarioRepository from '../repositories/UsuarioRepository';

class UsuarioController {

    static getUsuarios = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const users = await UsuarioRepository.getUsuarios();

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

export default UsuarioController;