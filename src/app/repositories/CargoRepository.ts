import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import ICargo from "../interfaces/ICargo";
import Cargo from "../models/Cargo";
import IEmpresa from "../interfaces/IEmpresa";
class CargoRepository {
    private cargoRepository = AppDataSource.getRepository(Cargo);

    public getCargos = ({empresa, params}: {empresa: any, params?: any}) => {
        return this.cargoRepository
            .createQueryBuilder('cargo')
            .innerJoin('cargo.empresa', 'empresa')
            .select('cargo')
            .addSelect('empresa')
            .where('empresa.id = :empresa', { empresa })
            .skip(params.offset)
            .take(50)
            .getMany();
    }

    public getCargo = async ({empresa, id}: {empresa: number, id: number}) => {
        const queryBuilder = this.cargoRepository.createQueryBuilder('cargo');

        queryBuilder.where('cargo.empresa = :empresa', { empresa });
        queryBuilder.where('cargo.id = :id', { id });
        
        return queryBuilder.getOne();
    }

    public createNewCargo = (cargo: ICargo) => {
        const newCargo = this.cargoRepository.create(cargo as DeepPartial<Cargo>);
        return this.cargoRepository.save(newCargo);
    }

    public updateCargo = (cargo: ICargo) => {
        return this.cargoRepository.save(cargo as DeepPartial<Cargo>);
    }

    public deleteCargo = (id: number) => {
        return this.cargoRepository.delete(id);
    }
}

export default new CargoRepository;