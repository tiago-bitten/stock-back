import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import IEntrada from "../interfaces/IEntrada";
import Entrada from "../models/Entrada";

const entradaRepository = AppDataSource.getRepository(Entrada);

class EntradaRepository extends Entrada {
    public getEntradas = (): Promise<IEntrada[]> => {
        return entradaRepository.find();
    }

    public getEntrada = ({id, lote, produto, fornecedor}: {id?: number, lote?: number, produto?: number, fornecedor?: number}) => {
        const whereClause = id ? { id } : lote ? { lote } : produto ? { produto } : fornecedor ? { fornecedor } : null;
        return whereClause ? entradaRepository.findOne({ where: whereClause }) : Promise.resolve(null);
    }

    public createNewEntrada = (Entrada: IEntrada) => {
        const newEntrada = entradaRepository.create(Entrada as DeepPartial<Entrada>);
        return entradaRepository.save(newEntrada);
    }

    public updateEntrada = (Entrada: IEntrada) => {
        return entradaRepository.save(Entrada as DeepPartial<Entrada>);
    }

    public deleteEntrada = (id: number) => {
        return entradaRepository.delete(id);
    }
}

export default new EntradaRepository;