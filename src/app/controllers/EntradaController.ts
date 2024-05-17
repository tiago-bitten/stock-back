import { Request, Response, NextFunction } from 'express';
import EntradaRepository from '../repositories/EntradaRepository';
import IEntrada from '../interfaces/IEntrada';

class EntradaController {

    public getEntradas = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const entradas = await EntradaRepository.getEntradas();

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

}

export default new EntradaController;