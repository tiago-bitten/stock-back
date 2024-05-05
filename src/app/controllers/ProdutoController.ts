import IProduto from "../interfaces/IProduto";
import ProdutoRepository from "../repositories/ProdutoRepository";
import { Request, Response, NextFunction } from 'express';

class ProdutoController {
    
    public getProducts = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const products = await ProdutoRepository.getProducts();

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
}

export default new ProdutoController;