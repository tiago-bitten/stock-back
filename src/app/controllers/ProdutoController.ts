import IProduto from "../interfaces/IProduto";
import ProdutoRepository from "../repositories/ProdutoRepository";
import { Request, Response, NextFunction } from 'express';

class ProdutoController {
    
    public getProducts = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = req.query.empresa;

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const params = {
                skip: req.query.skip ? Number(req.query.skip) : 0
            }

            const products = await ProdutoRepository.getProducts(
                { empresa: reqEmpresa, params }
            );

            return res.status(200).send({
                products
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Internal server error',
                error: error
            });
        }
    }

    public storeProduct = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const { descricao, custo, preco, quantidadeMinima, quantidadeMaxima, validade, categoria, empresa } = req.body;

            if (!descricao || !custo || !preco || !quantidadeMinima || !quantidadeMaxima || !validade || !categoria || !empresa) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const productToCreate: IProduto = req.body;

            const newProduct = await ProdutoRepository.createNewProduct(productToCreate);

            if (!newProduct) {
                throw new Error('Error while creating product');
            }

            return res.status(201).json({
                message: 'Product created successfully',
                product: newProduct
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Internal server error',
                error: error
            });
        }
    }

    public updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }
            
            const produtoId = Number(req.params.id);

            if (!produtoId) {
                return res.status(400).json({message: 'Produto not found'});
            }

            const { descricao, custo, preco, quantidadeMinima, quantidadeMaxima, validade, categoria } = req.body;

            const produtoToUpdate = await ProdutoRepository.getProduct({
                empresa: reqEmpresa,
                id: produtoId
            });

            if (!produtoToUpdate) {
                return res.status(404).json({ message: 'Produto not found' });
            }

            (typeof descricao !== 'undefined') ? produtoToUpdate.descricao = descricao : null;
            (typeof custo !== 'undefined') ? produtoToUpdate.custo = custo : null;
            (typeof preco !== 'undefined') ? produtoToUpdate.preco = preco : null;
            (typeof quantidadeMinima !== 'undefined') ? produtoToUpdate.quantidadeMinima = quantidadeMinima : null;
            (typeof quantidadeMaxima !== 'undefined') ? produtoToUpdate.quantidadeMaxima = quantidadeMaxima : null;
            (typeof validade !== 'undefined') ? produtoToUpdate.validade = validade : null;
            (typeof categoria !== 'undefined') ? produtoToUpdate.categoria = categoria : null;

            const updatedProduto = await ProdutoRepository.updateProduct(produtoToUpdate);

            if (!updatedProduto) {
                return res.status(500).json({ message: 'Error while updating produto' });
            }

            return res.status(200).json({
                message: 'Produto updated successfully',
                category: updatedProduto
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        }
    }

    public deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const produtoId = Number(req.params.id);

            if (!produtoId) {
                return res.status(400).json({message: 'Produto not informed'});
            }

            const produtoToDelete = await ProdutoRepository.getProduct({
                empresa: reqEmpresa,
                id: produtoId
            });

            if (!produtoToDelete) {
                return res.status(404).json({ message: 'produto not found' });
            }

            const deletedproduto = await ProdutoRepository.deleteProduct(produtoId);

            if (!deletedproduto) {
                return res.status(500).json({ message: 'Error while deleting produto' });
            }

            return res.status(200).json({
                message: 'Produto deleted successfully',
                category: deletedproduto
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        }
    }
}

export default new ProdutoController;