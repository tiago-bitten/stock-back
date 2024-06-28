import moment from "moment";
import IProduto from "../interfaces/IProduto";
import ProdutoRepository from "../repositories/ProdutoRepository";
import { Request, Response, NextFunction } from 'express';
import CategoriaRepository from "../repositories/CategoriaRepository";

class ProdutoController {
    public getProduct = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const produtoId = Number(req.params.id);

            if (!produtoId) {
                return res.status(400).json({message: 'Produto not informed'});
            }

            const produto = await ProdutoRepository.getProduct({
                empresa: reqEmpresa,
                id: produtoId
            });

            if (!produto) {
                return res.status(404).json({ message: 'Produto not found' });
            }

            return res.status(200).send({
                produto
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Internal server error', 
                error: error 
            });
        }
    }

    public getProducts = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            if (req.query.validade && !moment(String(req.query.validade), 'YYYY-MM-DD', true).isValid()) {
                return res.status(400).json({message: 'Invalid date'});
            }

            const params = {
                skip: req.query.skip ? Number(req.query.skip) : 0,
                descricao: req.query.descricao ? String(req.query.descricao) : undefined,
                custo: req.query.custo ? Number(req.query.custo) : undefined,
                preco: req.query.preco ? Number(req.query.preco) : undefined,
                quantidadeMinima: req.query.quantidadeMinima ? Number(req.query.quantidadeMinima) : undefined,
                quantidadeMaxima: req.query.quantidadeMaxima ? Number(req.query.quantidadeMaxima) : undefined,
                validade: req.query.validade ? moment(String(req.query.validade)) : undefined,
                categoria: req.query.categoria ? Number(req.query.categoria) : undefined
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
            const reqEmpresa = Number(req.query.empresa);
            
            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const { descricao, custo, preco, quantidadeMinima, quantidadeMaxima, validade, categoria } = req.body;

            if (!descricao || !custo || !preco || !quantidadeMinima || !quantidadeMaxima || !validade || !categoria) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const categoriaExists = await CategoriaRepository.getCategory({
                id: categoria,
                empresa: reqEmpresa
            });

            if (!categoriaExists) {
                return res.status(400).json({message: 'Categoria not found'});
            }

            const productToCreate: IProduto = {
                empresa: reqEmpresa,
                descricao,
                custo,
                preco,
                quantidadeMinima,
                quantidadeMaxima,
                validade,
                categoria
            };

            const newProduct = await ProdutoRepository.createNewProduct(productToCreate);

            if (!newProduct) {
                throw new Error('Error while creating product');
            }

            return res.status(200).json({
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

            if (typeof categoria !== 'undefined') {
                const categoriaExists = await CategoriaRepository.getCategory({
                    id: categoria,
                    empresa: reqEmpresa
                });
    
                if (!categoriaExists) {
                    return res.status(400).json({message: 'Categoria not found'});
                }
    
                produtoToUpdate.categoria = categoria
            }

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