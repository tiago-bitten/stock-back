import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import IEstoque from "../interfaces/IEstoque";
import Estoque from "../models/Estoque";

const estoqueRepository = AppDataSource.getRepository(Estoque);

class EstoqueRepository extends Estoque {
    public getEstoques = (): Promise<IEstoque[]> => {
        return estoqueRepository.find();
    }

    public getEstoque = ({id, descricao}: {id?: number, descricao?: string}) => {
        const whereClause = id ? { id } : descricao ? { descricao } : null;
        return whereClause ? estoqueRepository.findOne({ where: whereClause, relations: ['empresa'] }) : Promise.resolve(null);
    }

    public createNewEstoque = (Estoque: IEstoque) => {
        const newEstoque = estoqueRepository.create(Estoque as DeepPartial<Estoque>);
        return estoqueRepository.save(newEstoque);
    }

    public updateEstoque = (Estoque: IEstoque) => {
        return estoqueRepository.save(Estoque as DeepPartial<Estoque>);
    }

    public deleteEstoque = (id: number) => {
        return estoqueRepository.delete(id);
    }
}

export default new EstoqueRepository;