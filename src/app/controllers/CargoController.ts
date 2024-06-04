import { Request, Response, NextFunction } from 'express';
import ICargo from '../interfaces/ICargo';
import CargoRepository from '../repositories/CargoRepository';

class CargoController {
    public getCargos = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const cargos = await CargoRepository.getCargos();

            return res.status(200).send({
                cargos
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        }
    }

    public storeCargo = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const { empresa, descricao, nivel } = req.body;

            if (!empresa || !descricao || !nivel) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const cargoToCreate: ICargo = req.body;

            const newCargo = await CargoRepository.createNewCargo(cargoToCreate);

            if (!newCargo) {
                return res.status(500).json({ message: 'Error while creating cargo' });
            }

            return res.status(201).json({
                message: 'Cargo created successfully',
                category: newCargo
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        }
    }
}

export default new CargoController;