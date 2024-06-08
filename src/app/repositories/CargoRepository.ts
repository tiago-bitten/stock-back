import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import ICargo from "../interfaces/ICargo";
import Cargo from "../models/Cargo";
class CargoRepository {
    private cargoRepository = AppDataSource.getRepository(Cargo);

    public getCargos = (params?: any): Promise<ICargo[]> => {
        const offset = params.skip ? params.skip : 0;
        const empresa = params.empresa;

        return this.cargoRepository
            .createQueryBuilder('cargo')
            .innerJoin('cargo.empresa', 'empresa')
            .select('cargo')
            .addSelect('empresa')
            .where('empresa.id = :empresa', { empresa })
            .skip(offset)
            .take(50)
            .getMany();
    }

    public getCargo = async ({empresa, id}: {empresa: number, id: number}): Promise<ICargo | null> => {
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