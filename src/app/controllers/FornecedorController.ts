import { Request, Response, NextFunction } from 'express';
import IFornecedor from '../interfaces/IFornecedor';
import FornecedorRepository from '../repositories/FornecedorRepository';

class FornecedorController {
    public getFornecedores = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const fornecedores = await FornecedorRepository.getFornecedores();
            return res.status(200).send({
                fornecedores
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        }
    }

    public storeFornecedor = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const { empresa, descricao, email, telefone, cnpj, logradouro, cidade } = req.body;

            if (!empresa || !descricao || !email || !telefone || !cnpj || !logradouro || !cidade) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const fornecedorToCreate: IFornecedor = req.body;

            const newFornecedor = await FornecedorRepository.createNewFornecedor(fornecedorToCreate);

            return res.status(201).json({
                message: 'Fornecedor created successfully',
                category: newFornecedor
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        }
    }
}

export default new FornecedorController;