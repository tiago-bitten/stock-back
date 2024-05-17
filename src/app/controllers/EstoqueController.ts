import { Request, Response, NextFunction } from 'express';
import EstoqueRepository from '../repositories/EstoqueRepository';
import IEstoque from '../interfaces/IEstoque';

class LoteController {

    public getEstoques = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const estoques = await EstoqueRepository.getEstoques();

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
            const { descricao, empresa } = req.body;

            if (!descricao || !empresa) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const estoqueToCreate: IEstoque = req.body;

            const newLote = await EstoqueRepository.createNewEstoque(estoqueToCreate);

            if (!newLote) {
                throw new Error('Error while creating Estoque');
            }

            return res.status(201).json({
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

}

export default new LoteController;