import { Request, Response, NextFunction } from 'express';
import LoteRepository from '../repositories/LoteRepository';
import ILote from '../interfaces/ILote';

class LoteController {

    public getLotes = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const lotes = await LoteRepository.getLotes();

            return res.status(200).send({
                lotes
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Internal server error',
                error: error
            });
        }
    }

    public storeLote = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const { data, estoque, empresa } = req.body;

            if (!data || !estoque || !empresa) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const loteToCreate: ILote = req.body;

            const newLote = await LoteRepository.createNewLote(loteToCreate);

            if (!newLote) {
                throw new Error('Error while creating lote');
            }

            return res.status(201).json({
                message: 'Lote created successfully',
                lote: newLote
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