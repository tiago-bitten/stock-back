import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import ICargo from "../interfaces/ICargo";
import Cargo from "../models/Cargo";

const cargoRepository = AppDataSource.getRepository(Cargo);

class CargoRepository {
    public getCargos = (): Promise<ICargo[]> => {
        return cargoRepository.find();
    }

    public getCargo = ({id, descricao}: {id?: number, descricao?: string}): Promise<ICargo | null> => {
        const whereClause = id ? { id } : descricao ? { descricao } : null;
        return whereClause ? cargoRepository.findOne({ where: whereClause }) : Promise.resolve(null);
    }

    public createNewCargo = (cargo: ICargo) => {
        const newCargo = cargoRepository.create(cargo as DeepPartial<Cargo>);
        return cargoRepository.save(newCargo);
    }

    public updateCargo = (cargo: ICargo) => {
        return cargoRepository.save(cargo as DeepPartial<Cargo>);
    }

    public deleteCargo = (id: number) => {
        return cargoRepository.delete(id);
    }
}

export default new CargoRepository;