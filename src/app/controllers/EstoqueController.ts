import { Request, Response, NextFunction } from 'express';
import EstoqueRepository from '../repositories/EstoqueRepository';
import IEstoque from '../interfaces/IEstoque';

class LoteController {
    public getEstoque = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const estoqueId = Number(req.params.id);

            if (!estoqueId) {
                return res.status(400).json({message: 'Estoque not informed'});
            }

            const estoque = await EstoqueRepository.getEstoque({ 
                empresa: reqEmpresa, 
                id: estoqueId 
            });

            if (!estoque) {
                return res.status(404).json({message: 'Estoque not found'});
            }

            return res.status(200).send({
                estoque
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Internal server error',
                error: error
            });
        }
    }

    public getEstoques = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const params = {
                skip: req.query.skip ? Number(req.query.skip) : 0,
                descricao: req.query.descricao ? String(req.query.descricao) : undefined
            }

            const estoques = await EstoqueRepository.getEstoques(
                { empresa: reqEmpresa, params }
            );

            return res.status(200).send({
                estoques
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Internal server error',
                error: error
            });
        }
    }

    public storeEstoque = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const { descricao } = req.body;

            if (!descricao) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const estoqueToCreate: IEstoque = {
                empresa: reqEmpresa,
                descricao: descricao
            };

            const newLote = await EstoqueRepository.createNewEstoque(estoqueToCreate);

            if (!newLote) {
                throw new Error('Error while creating Estoque');
            }

            return res.status(200).json({
                message: 'Estoque created successfully',
                Estoque: newLote
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Internal server error',
                error: error
            });
        }
    }

    public updateEstoque = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const estoqueId = Number(req.params.id);

            if (!estoqueId) {
                return res.status(400).json({message: 'Estoque not informed'});
            }

            const { descricao } = req.body;

            const estoqueToUpdate = await EstoqueRepository.getEstoque({ 
                empresa: reqEmpresa, 
                id: estoqueId 
            });

            if (!estoqueToUpdate) {
                return res.status(404).json({message: 'Estoque not found'});
            }

            (typeof descricao !== 'undefined') ? estoqueToUpdate.descricao = descricao : null;

            const updatedEstoque = await EstoqueRepository.updateEstoque(estoqueToUpdate);

            if (!updatedEstoque) {
                return res.status(500).json({ message: 'Error while updating estoque' });
            }

            return res.status(200).json({
                message: 'Estoque updated successfully',
                Estoque: updatedEstoque
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Internal server error',
                error: error
            });
        }
    }

    public deleteEstoque = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const estoqueId = Number(req.params.id);

            if (!estoqueId) {
                return res.status(400).json({message: 'Estoque not informed'});
            }

            const estoqueToDelete = await EstoqueRepository.getEstoque({ 
                empresa: reqEmpresa, 
                id: estoqueId 
            });

            if (!estoqueToDelete) {
                return res.status(404).json({message: 'Estoque not found'});
            }

            const deletedEstoque = await EstoqueRepository.deleteEstoque(estoqueId);

            if (!deletedEstoque) {
                return res.status(500).json({ message: 'Error while deleting estoque' });
            }

            return res.status(200).json({
                message: 'Estoque deleted successfully',
                Estoque: deletedEstoque
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Internal server error',
                error: error
            });
        }
    }

}

export default new LoteController;