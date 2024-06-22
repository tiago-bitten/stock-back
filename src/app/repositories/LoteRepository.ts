import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import ILote from "../interfaces/ILote";
import Lote from "../models/Lote";
import moment from "moment";

class LoteRepository extends Lote {
    private loteRepository = AppDataSource.getRepository(Lote);

    public getLotes = ({empresa, params}: {empresa: any, params: { skip: number, produto?: number, codigoBarras?: string, dataFabricacao?: Date | moment.Moment, dataVencimento?: Date | moment.Moment, observacao?: string}}): Promise<ILote[]> => {
        return this.loteRepository
            .createQueryBuilder('lote')
            .select('lote')
            .innerJoin('lote.produto', 'produto')
            .where('empresa.id = :empresa', { empresa })
            .andWhere(w => {
                if (params.produto) {
                    w.where('produto.id = :produto', { produto: params.produto });
                }
                if (params.codigoBarras) {
                    w.andWhere('lote.codigoBarras LIKE :codigoBarras', { codigoBarras: `%${params.codigoBarras}%` });
                }
                if (params.dataFabricacao) {
                    w.andWhere('lote.dataFabricacao >= :dataFabricacao', { dataFabricacao: params.dataFabricacao });
                }
                if (params.dataVencimento) {
                    w.andWhere('lote.dataVencimento <= :dataVencimento', { dataVencimento: params.dataVencimento });
                }
                if (params.observacao) {
                    w.andWhere('lote.observacao LIKE :observacao', { observacao: `%${params.observacao}%` });
                }
            })
            .skip(params.skip)
            .take(50)
            .getMany();
    }

    public getLote = ({empresa, id}: {empresa: number, id?: number}) => {        
        const lote = this.loteRepository
            .createQueryBuilder('lote')
            .select('lote')
            .where('lote.empresa = :empresa', { empresa })
            .andWhere('lote.id = :id', { id })
            .getOne();
        
        return lote;
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