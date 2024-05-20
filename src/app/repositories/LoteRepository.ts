import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import ILote from "../interfaces/ILote";
import Lote from "../models/Lote";
import moment from "moment";

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

    // #region SQL Queries

    public getLotesVencimento = async () => {
        const now = moment().format('YYYY-MM-DD');

        const lote = await loteRepository.createQueryBuilder('lote')
            .leftJoin('lote.empresa', 'empresa')
            .select('lote')
            .addSelect('empresa')
            .where('lote.dataVencimento < :dataVencimento', { dataVencimento: now })
            .getMany();

        return lote;
    }

    // #endregion
}

export default new LoteRepository;