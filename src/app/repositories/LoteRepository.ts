import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import ILote from "../interfaces/ILote";
import Lote from "../models/Lote";
import moment from "moment";

class LoteRepository {
    private loteRepository = AppDataSource.getRepository(Lote);

    // Buscar lotes com filtros
    public getLotes = async ({
        empresa,
        params
    }: {
        empresa: number;
        params: {
            skip: number;
            produto?: number;
            codigoBarras?: string;
            dataFabricacao?: Date | moment.Moment;
            dataVencimento?: Date | moment.Moment;
            observacao?: string;
        };
    }): Promise<ILote[]> => {
        const queryBuilder = this.loteRepository
            .createQueryBuilder('lote')
            .select('lote')
            .addSelect('produto')
            .leftJoin('lote.produto', 'produto')
            .where('lote.empresa = :empresa', { empresa });

        if (params.produto) {
            queryBuilder.andWhere('produto.id = :produto', { produto: params.produto });
        }

        if (params.codigoBarras) {
            queryBuilder.andWhere('lote.codigoBarras LIKE :codigoBarras', {
                codigoBarras: `%${params.codigoBarras}%`,
            });
        }

        if (params.dataFabricacao) {
            queryBuilder.andWhere('lote.dataFabricacao >= :dataFabricacao', {
                dataFabricacao: moment(params.dataFabricacao).format('YYYY-MM-DD'),
            });
        }

        if (params.dataVencimento) {
            queryBuilder.andWhere('lote.dataVencimento <= :dataVencimento', {
                dataVencimento: moment(params.dataVencimento).format('YYYY-MM-DD'),
            });
        }

        if (params.observacao) {
            queryBuilder.andWhere('lote.observacao LIKE :observacao', {
                observacao: `%${params.observacao}%`,
            });
        }

        return queryBuilder.skip(params.skip).take(50).getMany();
    };

    // Buscar um lote específico
    public getLote = async ({
        empresa,
        id
    }: {
        empresa: number;
        id?: number;
    }): Promise<ILote | null> => {
        const lote = await this.loteRepository
            .createQueryBuilder('lote')
            .leftJoin('lote.produto', 'produto')
            .select('lote')
            .addSelect(['produto.id', 'produto.descricao'])
            .where('lote.empresa = :empresa', { empresa })
            .andWhere('lote.id = :id', { id })
            .getOne();

        return lote || null;
    };

    // Criar novo lote
    public createNewLote = async (lote: ILote): Promise<ILote> => {
        const newLote = this.loteRepository.create(lote as DeepPartial<Lote>);
        return await this.loteRepository.save(newLote);
    };

    // Atualizar lote
    public updateLote = async (lote: ILote): Promise<ILote> => {
        return await this.loteRepository.save(lote as DeepPartial<Lote>);
    };

    // Deletar lote
    public deleteLote = async (id: number): Promise<void> => {
        await this.loteRepository.delete(id);
    };

    // Lotes próximos do vencimento
    public getExpiringLotes = async (empresa: number, periodo: number): Promise<ILote[]> => {
        const now = moment().format('YYYY-MM-DD');
        const expiringDate = moment().add(periodo, 'days').format('YYYY-MM-DD');

        const lotes = await this.loteRepository
            .createQueryBuilder('lote')
            .leftJoin('lote.produto', 'produto')
            .select('lote')
            .addSelect(['produto.id', 'produto.descricao'])
            .where('lote.empresa = :empresa', { empresa })
            .andWhere('lote.dataVencimento BETWEEN :now AND :expiringDate', {
                now,
                expiringDate,
            })
            .getMany();

        return lotes;
    };

    // Lotes vencidos
    public getExpiredLotes = async (empresa: number): Promise<ILote[]> => {
        const now = moment().format('YYYY-MM-DD');

        const lotes = await this.loteRepository
            .createQueryBuilder('lote')
            .leftJoin('lote.produto', 'produto')
            .select('lote')
            .addSelect(['produto.id', 'produto.descricao'])
            .where('lote.empresa = :empresa', { empresa })
            .andWhere('lote.dataVencimento < :now', { now })
            .getMany();

        return lotes;
    };
}

export default new LoteRepository();
