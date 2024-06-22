import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import ICargo from "../interfaces/ICargo";
import Cargo from "../models/Cargo";
import IEmpresa from "../interfaces/IEmpresa";
class CargoRepository {
    private cargoRepository = AppDataSource.getRepository(Cargo);

    public getCargos = ({empresa, params}: {empresa: any, params: { skip: number, descricao?: string, nivel?: string }}) => {
        return this.cargoRepository
            .createQueryBuilder('cargo')
            .select('cargo')
            .where('empresa.id = :empresa', { empresa })
            .andWhere(w => {
                if (params.descricao) {
                    w.andWhere('cargo.nome LIKE :nome', { nome: `%${params.descricao}%` });
                }
                if (params.nivel) {
                    w.andWhere('cargo.descricao = UPPER(:nivel)', { nivel: params.nivel });
                }
            })
            .skip(params.skip)
            .take(50)
            .getMany();
    }

    public getCargo = async ({empresa, id}: {empresa: number, id: number}) => {
        const cargo = this.cargoRepository
            .createQueryBuilder('cargo')
            .select('cargo')
            .where('empresa.id = :empresa', { empresa })
            .andWhere('cargo.id = :id', { id })
            .getOne();

        return cargo;
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