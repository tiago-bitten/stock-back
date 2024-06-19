import { Request, Response, NextFunction } from 'express';
import IFornecedor from '../interfaces/IFornecedor';
import FornecedorRepository from '../repositories/FornecedorRepository';

class FornecedorController {
    public getFornecedores = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = req.query.empresa;

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const params = {
                skip: req.query.skip ? Number(req.query.skip) : 0
            }

            const fornecedores = await FornecedorRepository.getFornecedores(
                { empresa: reqEmpresa, params }
            );

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
            const reqEmpresa = req.query.empresa;

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

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

    public updateFornecedor = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }
            
            const fornecedorId = Number(req.params.id);

            if (!fornecedorId) {
                return res.status(400).json({message: 'Fornecedor not found'});
            }

            const { descricao, email, telefone, cnpj, logradouro, cidade } = req.body;

            const fornecedorToUpdate = await FornecedorRepository.getFornecedor({
                empresa: reqEmpresa,
                id: fornecedorId
            });

            if (!fornecedorToUpdate) {
                return res.status(404).json({ message: 'Fornecedor not found' });
            }

            (typeof descricao !== 'undefined') ? fornecedorToUpdate.descricao = descricao : null;
            (typeof email !== 'undefined') ? fornecedorToUpdate.email = email : null;
            (typeof telefone !== 'undefined') ? fornecedorToUpdate.telefone = telefone : null;
            (typeof cnpj !== 'undefined') ? fornecedorToUpdate.cnpj = cnpj : null;
            (typeof logradouro !== 'undefined') ? fornecedorToUpdate.logradouro = logradouro : null;
            (typeof cidade !== 'undefined') ? fornecedorToUpdate.cidade = cidade : null;

            const updatedFornecedor = await FornecedorRepository.updateFornecedor(fornecedorToUpdate);

            if (!updatedFornecedor) {
                return res.status(500).json({ message: 'Error while updating fornecedor' });
            }

            return res.status(200).json({
                message: 'Fornecedor updated successfully',
                category: updatedFornecedor
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        }
    }

    public deleteFornecedor = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const fornecedorId = Number(req.params.id);

            if (!fornecedorId) {
                return res.status(400).json({message: 'Fornecedor not found'});
            }

            const fornecedorToDelete = await FornecedorRepository.getFornecedor({
                empresa: reqEmpresa,
                id: fornecedorId
            });

            if (!fornecedorToDelete) {
                return res.status(404).json({ message: 'Fornecedor not found' });
            }

            const deletedFornecedor = await FornecedorRepository.deleteFornecedor(fornecedorId);

            if (!deletedFornecedor) {
                return res.status(500).json({ message: 'Error while deleting fornecedor' });
            }

            return res.status(200).json({
                message: 'Fornecedor deleted successfully',
                category: deletedFornecedor
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