import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import ILote from "../interfaces/ILote";
import Lote from "../models/Lote";

const loteRepository = AppDataSource.getRepository(Lote);

class LoteRepository extends Lote {
    public getLotes = (): Promise<ILote[]> => {
        return loteRepository.find();
    }

    public getLote = ({id, data}: {id?: number, data?: Date}) => {
        const whereClause = id ? { id } : data ? { data } : null;
        return whereClause ? loteRepository.findOne({ where: whereClause, relations: ['empresa'] }) : Promise.resolve(null);
    }

    public createNewLote = (lote: ILote) => {
        const newLote = loteRepository.create(lote as DeepPartial<Lote>);
        return loteRepository.save(newLote);
    }

    public updateLote = (lote: ILote) => {
        return loteRepository.save(lote as DeepPartial<Lote>);
    }

    public deleteLote = (id: number) => {
        return loteRepository.delete(id);
    }
}

export default new LoteRepository;