
import { Request, Response, NextFunction } from 'express';
import ICategoria from '../interfaces/ICategoria';
import CategoriaRepository from '../repositories/CategoriaRepository';

class CategoriaController {
    public getCategories = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const categories = await CategoriaRepository.getCategories();

            return res.status(200).send({
                categories
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        }
    }

    public storeCategory = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const { descricao, empresa } = req.body;

            if (!descricao || !empresa) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const categoryToCreate: ICategoria = req.body;

            const newCategory = await CategoriaRepository.createNewCategory(categoryToCreate);

            if (!newCategory) {
                return res.status(500).json({ message: 'Error while creating category' });
            }

            return res.status(201).json({
                message: 'Category created successfully',
                category: newCategory
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        }
    }
}

export default new CategoriaController;