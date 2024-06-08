import { Request, Response, NextFunction } from 'express';
import LoteRepository from '../repositories/LoteRepository';
import ILote from '../interfaces/ILote';
import moment from 'moment';

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

    getExpiredLotes = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const empresa = Number(req.query.empresa);


            if (!empresa) {
                return res.status(400).json({ message: 'Company not founded' });
            }

            const queryExpiredLotes = await LoteRepository.getExpiredLotes(empresa);

            if (!queryExpiredLotes) {
                return res.status(200).json({
                    message: 'No expired batches found'
                });
            }

            const arrExpiredLotes: any = queryExpiredLotes
                .map(m => ({
                    id: m.id,
                    codigoBarras: m.codigoBarras,
                    dataFabricacao: m.dataFabricacao,
                    dataVencimento: m.dataVencimento,
                    produto: m.produto,
                    status: this.getLoteExpiringStatus(m.dataVencimento)
                }));
            
            return res.status(200).send({
                arrExpiredLotes
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

    // #region Utils

    /**
     * VERIFICAR STATUS DE VALIDADE DO LOTE
     * 
     * @param dataVencimento 
     * @return string
     */
    getLoteExpiringStatus = (dataVencimento: Date): string => {
        const now = moment();

        if (moment(dataVencimento).isBefore(now)) {
            return 'expired';
        }

        if ( moment(dataVencimento).isSame(now)) {
            return 'expiring';
        }

        return 'valid';
    }

    // #endregion

}

export default new LoteController;