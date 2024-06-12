import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import ILote from "../interfaces/ILote";
import Lote from "../models/Lote";
import moment from "moment";

class LoteRepository extends Lote {
    private loteRepository = AppDataSource.getRepository(Lote);

    public getLotes = ({empresa, params}: {empresa: any, params?: any}): Promise<ILote[]> => {
        return this.loteRepository
            .createQueryBuilder('lote')
            .innerJoin('lote.empresa', 'empresa')
            .select('lote')
            .addSelect('empresa')
            .where('empresa.id = :empresa', { empresa })
            .skip(params.offset)
            .take(50)
            .getMany();
    }

    public getLote = ({id, data}: {id?: number, data?: Date}) => {
        const whereClause = id ? { id } : data ? { data } : null;
        return whereClause ? this.loteRepository.findOne({ where: whereClause, relations: ['empresa'] }) : Promise.resolve(null);
    }

    public createNewLote = (lote: ILote) => {
        const newLote = this.loteRepository.create(lote as DeepPartial<Lote>);
        return this.loteRepository.save(newLote);
    }

    public updateLote = (lote: ILote) => {
        return this.loteRepository.save(lote as DeepPartial<Lote>);
    }

    public deleteLote = (id: number) => {
        return this.loteRepository.delete(id);
    }

    // #region SQL Queries

    public getExpiringLotes = async (empresa: number, periodo: number) => {
        const now = moment().format('YYYY-MM-DD');
        const expiringDate = moment().add(periodo, 'days').format('YYYY-MM-DD');

        const lote = await this.loteRepository.createQueryBuilder('lote')
            .innerJoin('lote.produto', 'produto')
            .select('lote')
            .addSelect(['produto.id', 'produto.descricao'])
            .where('lote.empresa = :empresa', { empresa: empresa })
            .andWhere('lote.dataVencimento BETWEEN :now AND :expiringDate', { now: now, expiringDate: expiringDate })
            .getMany();

        return lote;
    }

    public getExpiredLotes = async (empresa: number) => {
        const now = moment().format('YYYY-MM-DD');

        const lote = await this.loteRepository.createQueryBuilder('lote')
            .innerJoin('lote.produto', 'produto')
            .select('lote')
            .addSelect(['produto.id', 'produto.descricao'])
            .where('lote.empresa = :empresa', { empresa: empresa })
            .andWhere('lote.dataVencimento < :dataVencimento', { dataVencimento: now })
            .getMany();

        return lote;
    }

    // #endregion
}

export default new LoteRepository;