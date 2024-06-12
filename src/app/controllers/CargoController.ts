import { Request, Response, NextFunction } from 'express';
import ICargo from '../interfaces/ICargo';
import CargoRepository from '../repositories/CargoRepository';

class CargoController {
    public getCargos = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = req.query.empresa;

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const params = {
                skip: req.query.skip ? Number(req.query.skip) : 0
            }

            const cargos = await CargoRepository.getCargos(
                {empresa: reqEmpresa, params}
            );

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
            const reqEmpresa = req.query.empresa;

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }
            
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

    public updateCargo = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const cargoId = Number(req.params.id);

            if (!cargoId) {
                return res.status(400).json({message: 'Cargo not found'});
            }

            const { descricao, nivel } = req.body;

            const cargoToUpdate = await CargoRepository.getCargo({ 
                empresa: reqEmpresa, id: cargoId 
            });

            if (!cargoToUpdate) {
                return res.status(400).json({ message: 'Cargo not found' });
            }

            (typeof descricao != 'undefined') ? cargoToUpdate.descricao = descricao : null;
            (typeof nivel != 'undefined') ? cargoToUpdate.nivel = nivel : null;

            const updatedCargo = await CargoRepository.updateCargo(cargoToUpdate);
            
            if (!updatedCargo) {
                return res.status(500).json({ message: 'Error while updating cargo' });
            }

            return res.status(201).json({
                message: 'Cargo updated successfully',
                category: updatedCargo
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        }
    }

    public deleteCargo = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const cargoId = Number(req.params.id);

            if (!cargoId) {
                return res.status(400).json({message: 'Cargo not found'});
            }

            const cargoToDelete = await CargoRepository.getCargo({ 
                empresa: reqEmpresa, id: cargoId 
            });

            if (!cargoToDelete) {
                return res.status(400).json({ message: 'Cargo not found' });
            }

            const deletedCargo = await CargoRepository.deleteCargo(cargoId);

            if (!deletedCargo) {
                return res.status(500).json({ message: 'Error while deleting cargo' });
            }

            return res.status(201).json({
                message: 'Cargo deleted successfully',
                category: deletedCargo
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