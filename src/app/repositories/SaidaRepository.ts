import { AppDataSource } from "../../database/data-source";
import Saida from "../models/Saida";

const saidaRepository = AppDataSource.getRepository(Saida);

class SaidaRepository {
    public getSaidas = (): Promise<Saida[]> => {
        return saidaRepository.find();
    }

    public getSaida = ({id, quantidade, lote, produto, fornecedor}: {id?: number, quantidade?: number, lote?: number, produto?: number, fornecedor?: number}): Promise<Saida | null> => {
        const whereClause = id ? { id } : quantidade ? { quantidade } : lote ? { lote } : produto ? { produto } : fornecedor ? { fornecedor } : null;
        return whereClause ? saidaRepository.findOne({ where: whereClause }) : Promise.resolve(null);
    }

    public createNewSaida = (saida: Saida) => {
        const newSaida = saidaRepository.create(saida);
        return saidaRepository.save(newSaida);
    }

    public updateSaida = (saida: Saida) => {
        return saidaRepository.save(saida);
    }

    public deleteSaida = (id: number) => {
        return saidaRepository.delete(id);
    }
}

export default new SaidaRepository;