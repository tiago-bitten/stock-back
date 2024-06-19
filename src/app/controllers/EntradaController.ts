import { Request, Response, NextFunction } from 'express';
import EntradaRepository from '../repositories/EntradaRepository';
import IEntrada from '../interfaces/IEntrada';

class EntradaController {

    public getEntradas = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = req.query.empresa;

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const params = {
                skip: req.query.skip ? Number(req.query.skip) : 0
            }

            const entradas = await EntradaRepository.getEntradas(
                { empresa: reqEmpresa, params }
            );

            return res.status(200).send({
                entradas
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Internal server error',
                error: error
            });
        }
    }

    public storeEntrada = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = req.query.empresa;

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const { quantidade, lote, fornecedor, produto } = req.body;

            if (!quantidade || !lote || !fornecedor || !produto) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const entradaToCreate: IEntrada = req.body;

            const newEntrada = await EntradaRepository.createNewEntrada(entradaToCreate);

            if (!newEntrada) {
                throw new Error('Error while creating Entrada');
            }

            return res.status(201).json({
                message: 'Entrada created successfully',
                Entrada: newEntrada
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Internal server error',
                error: error
            });
        }
    }

    public updateEntrada = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const entradaId = Number(req.params.id);

            if (!entradaId) {
                return res.status(400).json({message: 'Entrada not informed'});
            }



            const entradaToUpdate = await EntradaRepository.getEntrada({ 
                id: entradaId,
                empresa: reqEmpresa
            });

            if (!entradaToUpdate) {
                return res.status(400).json({message: 'Entrada not found'});
            }
            
            const { quantidade } = req.body;

            (typeof quantidade !== 'undefined') ? entradaToUpdate.quantidade = quantidade : null;

            const updatedEntrada = await EntradaRepository.updateEntrada(entradaToUpdate);

            if (!updatedEntrada) {
                throw new Error('Error while updating Entrada');
            }

            return res.status(200).json({
                message: 'Entrada updated successfully',
                Entrada: updatedEntrada
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Internal server error',
                error: error
            });
        }
    }

    public deleteEntrada = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const entradaId = Number(req.params.id);

            if (!entradaId) {
                return res.status(400).json({message: 'Entrada not informed'});
            }

            const entradaToDelete = await EntradaRepository.getEntrada({ 
                id: entradaId,
                empresa: reqEmpresa
            });

            if (!entradaToDelete) {
                return res.status(400).json({message: 'Entrada not found'});
            }

            const deletedEntrada = await EntradaRepository.deleteEntrada(entradaId);

            if (!deletedEntrada) {
                throw new Error('Error while deleting Entrada');
            }

            return res.status(200).json({
                message: 'Entrada deleted successfully',
                Entrada: deletedEntrada
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Internal server error',
                error: error
            });
        }
    }

}

export default new EntradaController;