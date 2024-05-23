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

    getLotesVencimento = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {

            const lotesVencimento = await LoteRepository.getLotesVencimento();

            if (!lotesVencimento) {
                return res.status(200).json({
                    message: 'No expired batches found'
                });
            }
            
            return res.status(200).send({
                lotesVencimento
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
            const { codigoBarras, quantidade, observacoes, dataFabricacao, dataVencimento, produto, empresa } = req.body;

            if (!codigoBarras || !quantidade || !dataFabricacao || !dataVencimento || !produto || !empresa) {
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