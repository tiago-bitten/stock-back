import { Request, Response, NextFunction } from 'express';
import IFornecedorProduto from '../interfaces/IFornecedorProduto';
import FornecedorProdutoRepository from '../repositories/FornecedorProdutoRepository';
import FornecedorRepository from '../repositories/FornecedorRepository';
import ProdutoRepository from '../repositories/ProdutoRepository';

class FornecedorProdutoController {
    public getFornecedorProduto = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try { 
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const fornecedorProdutoId = Number(req.params.id);

            if (!fornecedorProdutoId) {
                return res.status(400).json({message: 'Fornecedor produto not informed'});
            }

            const fornecedorProduto = await FornecedorProdutoRepository.getFornecedorProduto({
                empresa: reqEmpresa,
                id: fornecedorProdutoId
            });

            if (!fornecedorProduto) {
                return res.status(404).json({ message: 'Fornecedor produto not found' });
            }

            return res.status(200).send({
                fornecedorProduto
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        }
    }

    public getFornecedorProdutos = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const params = {
                skip: req.query.skip ? Number(req.query.skip) : 0,
                fornecedor: req.query.fornecedor ? Number(req.query.fornecedor) : undefined,
                produto: req.query.produto ? Number(req.query.produto) : undefined
            }

            const fornecedorProdutos = await FornecedorProdutoRepository.getFornecedorProdutos(
                { empresa: reqEmpresa, params }
            );

            return res.status(200).send({
                fornecedorProdutos
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        }
    }

    public storeFornecedorProduto = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const { fornecedor, produto } = req.body;

            if (!fornecedor || !produto) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const fornecedorExists = await FornecedorRepository.getFornecedor({
                id: fornecedor,
                empresa: reqEmpresa
            });

            if (!fornecedorExists) {
                return res.status(400).json({message: 'Fornecedor not found'});
            }

            const produtoExists = await ProdutoRepository.getProduct({
                id: produto,
                empresa: reqEmpresa
            });

            if (!produtoExists) {
                return res.status(400).json({message: 'Produto not found'});
            }

            const fornecedorProdutoToCreate: IFornecedorProduto = {
                empresa: reqEmpresa,
                fornecedor,
                produto
            };

            const newFornecedorProduto = await FornecedorProdutoRepository.createNewFornecedorProduto(fornecedorProdutoToCreate);

            return res.status(200).json({
                message: 'Fornecedor produto created successfully',
                category: newFornecedorProduto
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        }
    }

    public updateFornecedorProduto = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }
            
            const fornecedorProdutoId = Number(req.params.id);

            if (!fornecedorProdutoId) {
                return res.status(400).json({message: 'Fornecedor produto not informed'});
            }

            const { fornecedor, produto } = req.body;

            const fornecedorProdutoToUpdate = await FornecedorProdutoRepository.getFornecedorProduto({
                empresa: reqEmpresa,
                id: fornecedorProdutoId
            });

            if (!fornecedorProdutoToUpdate) {
                return res.status(404).json({ message: 'Fornecedor produto not found' });
            }

            if (typeof fornecedor !== 'undefined') {
                
                const fornecedorExists = await FornecedorRepository.getFornecedor({
                    id: fornecedor,
                    empresa: reqEmpresa
                });
    
                if (!fornecedorExists) {
                    return res.status(400).json({message: 'Fornecedor not found'});
                }
    
                fornecedorProdutoToUpdate.fornecedor = fornecedor
            }

            if (typeof produto !== 'undefined') {

                const produtoExists = await ProdutoRepository.getProduct({
                    id: produto,
                    empresa: reqEmpresa
                });
    
                if (!produtoExists) {
                    return res.status(400).json({message: 'Produto not found'});
                }

                fornecedorProdutoToUpdate.produto = produto
            }

            const updatedFornecedorProduto = await FornecedorProdutoRepository.updateFornecedorProduto(fornecedorProdutoToUpdate);

            if (!updatedFornecedorProduto) {
                return res.status(500).json({ message: 'Error while updating fornecedor produto' });
            }

            return res.status(200).json({
                message: 'Fornecedor produto updated successfully',
                category: updatedFornecedorProduto
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        }
    }

    public deleteFornecedorProduto = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const fornecedorProdutoId = Number(req.params.id);

            if (!fornecedorProdutoId) {
                return res.status(400).json({message: 'Fornecedor produto not informed'});
            }

            const fornecedorProdutoToDelete = await FornecedorProdutoRepository.getFornecedorProduto({
                empresa: reqEmpresa,
                id: fornecedorProdutoId
            });

            if (!fornecedorProdutoToDelete) {
                return res.status(404).json({ message: 'Fornecedor produto not found' });
            }

            const deletedFornecedorProduto = await FornecedorProdutoRepository.deleteFornecedorProduto(fornecedorProdutoId);

            if (!deletedFornecedorProduto) {
                return res.status(500).json({ message: 'Error while deleting fornecedor produto' });
            }

            return res.status(200).json({
                message: 'Fornecedor produto deleted successfully',
                category: deletedFornecedorProduto
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        }
    }
}

export default new FornecedorProdutoController;