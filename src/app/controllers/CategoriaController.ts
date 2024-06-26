
import { Request, Response, NextFunction } from 'express';
import ICategoria from '../interfaces/ICategoria';
import CategoriaRepository from '../repositories/CategoriaRepository';

class CategoriaController {
    public getCategory = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const categoryId = Number(req.params.id);

            if (!categoryId) {
                return res.status(400).json({message: 'Category not informed'});
            }

            const category = await CategoriaRepository.getCategory({
                empresa: reqEmpresa,
                id: categoryId
            });

            if (!category) {
                return res.status(400).json({ message: 'Category not found' });
            }

            return res.status(200).send({
                category
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        }
    }
    
    public getCategories = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const params = {
                skip: req.query.skip ? Number(req.query.skip) : 0,
                descricao: req.query.descricao ? String(req.query.descricao) : undefined
            }

            const categories = await CategoriaRepository.getCategories({ 
                empresa: reqEmpresa,
                params 
            });

            return res.status(200).send({
                categories
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        }
    };

    public storeCategory = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const { descricao } = req.body;

            if (!descricao) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const categoryToCreate: ICategoria = {
                empresa: reqEmpresa,
                descricao
            };

            const newCategory = await CategoriaRepository.createNewCategory(categoryToCreate);

            if (!newCategory) {
                return res.status(500).json({ message: 'Error while creating category' });
            }

            return res.status(200).json({
                message: 'Category created successfully',
                category: newCategory
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        }
    };

    public updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const categoryId = Number(req.params.id);

            if (!categoryId) {
                return res.status(400).json({message: 'Category not found'});
            }

            const { descricao } = req.body;

            const categoryToUpdate = await CategoriaRepository.getCategory({
                empresa: reqEmpresa,
                id: categoryId
            });

            if (!categoryToUpdate) {
                return res.status(404).json({ message: 'Category not found' });
            }

            (typeof descricao !== 'undefined') ? categoryToUpdate.descricao = descricao : null;

            const updatedCategory = await CategoriaRepository.updateCategory(categoryToUpdate);

            if (!updatedCategory) {
                return res.status(500).json({ message: 'Error while updating category' });
            }

            return res.status(200).json({
                message: 'Category updated successfully',
                category: updatedCategory
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        }
    };

    public deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const categoryId = Number(req.params.id);

            if (!categoryId) {
                return res.status(400).json({message: 'Category not informed'});
            }

            const categoryToDelete = await CategoriaRepository.getCategory({
                empresa: reqEmpresa,
                id: categoryId
            });

            if (!categoryToDelete) {
                return res.status(404).json({ message: 'Category not found' });
            }

            const deletedCategory = await CategoriaRepository.deleteCategory(categoryId);

            if (!deletedCategory) {
                return res.status(500).json({ message: 'Error while deleting category' });
            }

            return res.status(200).json({
                message: 'Category deleted successfully'
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        }
    };

}

export default new CategoriaController;