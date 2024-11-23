import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import ISaida from "../interfaces/ISaida";
import Saida from "../models/Saida";

class SaidaRepository {
    private saidaRepository = AppDataSource.getRepository(Saida);

    getTotalSaidas = async ({empresa, params}: {empresa: number, params: { limit: number, dataInicial: Date | moment.Moment, dataFinal: Date | moment.Moment }}) => {
        const saidas = await this.saidaRepository
            .createQueryBuilder('saida')
            .select('produto.id AS produtoId')
            .addSelect('produto.descricao AS produto')
            .addSelect('SUM(saida.quantidade) AS quantidade')
            .leftJoin('saida.produto', 'produto')
            .where(w => {
                w.where('saida.empresa = :empresa', { empresa })
                w.andWhere('saida.created_at >= :dataInicial', { dataInicial: params.dataInicial });
                w.andWhere('saida.created_at <= :dataFinal', { dataFinal: params.dataFinal });
            })
            .groupBy('produto.id, produto.descricao')
            .orderBy('quantidade', 'DESC')
            .limit(params.limit)
            .getRawMany();

        return saidas;
    }

    public getSaidas = ({empresa, params}: {empresa: any, params: { skip: number, quantidade?: number, lote?: number, produto?: number, fornecedor?: number }}): Promise<Saida[]> => {
        return this.saidaRepository
            .createQueryBuilder('saida')
            .select('saida')
            .leftJoin('saida.produto', 'produto')
            .leftJoin('saida.fornecedor', 'fornecedor')
            .leftJoin('saida.lote', 'lote')
            .addSelect('produto')
            .where(w => {
                w.where('saida.empresa = :empresa', { empresa })

                if (params.quantidade) {
                    w.andWhere('saida.quantidade = :quantidade', { quantidade: params.quantidade });
                }

                if (params.lote) {
                    w.andWhere('saida.lote = :lote', { lote: params.lote });
                }

                if (params.produto) {
                    w.andWhere('saida.produto = :produto', { produto: params.produto });
                }

                if (params.fornecedor) {
                    w.andWhere('saida.fornecedor = :fornecedor', { fornecedor: params.fornecedor });
                }
            })
            .skip(params.skip)
            .take(50)
            .getMany();
    }

    public getSaida = ({empresa, id, quantidade, lote, produto, fornecedor}: {empresa: number, id?: number, quantidade?: number, lote?: number, produto?: number, fornecedor?: number}): Promise<Saida | null> => {
        const saida = this.saidaRepository
            .createQueryBuilder('saida')
            .select('saida')
            .leftJoin('saida.produto', 'produto')
            .leftJoin('saida.fornecedor', 'fornecedor')
            .leftJoin('saida.lote', 'lote')
            .where(w => {
                w.where('saida.empresa = :empresa', { empresa })

                if (id) {
                    w.andWhere('saida.id = :id', { id });
                }

                if (quantidade) {
                    w.andWhere('saida.quantidade = :quantidade', { quantidade });
                }

                if (lote) {
                    w.andWhere('saida.lote = :lote', { lote });
                }

                if (produto) {
                    w.andWhere('saida.produto = :produto', { produto });
                }
                
                if (fornecedor) {
                    w.andWhere('saida.fornecedor = :fornecedor', { fornecedor });
                }
            
            })
            .getOne();
        
        return saida;
    }

    public createNewSaida = (saida: ISaida) => {
        const newSaida = this.saidaRepository.create(saida as DeepPartial<Saida>);
        return this.saidaRepository.save(newSaida);
    }

    public updateSaida = (saida: ISaida) => {
        return this.saidaRepository.save(saida as DeepPartial<Saida>);
    }

    public deleteSaida = (id: number) => {
        return this.saidaRepository.delete(id);
    }
}

export default new SaidaRepository;