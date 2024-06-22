import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import ISaida from "../interfaces/ISaida";
import Saida from "../models/Saida";

class SaidaRepository {
    private saidaRepository = AppDataSource.getRepository(Saida);

    public getSaidas = ({empresa, params}: {empresa: any, params: { skip: number, quantidade?: number, lote?: number, produto?: number, fornecedor?: number }}): Promise<Saida[]> => {
        return this.saidaRepository
            .createQueryBuilder('saida')
            .select('saida')
            .innerJoin('saida.produto', 'produto')
            .innerJoin('saida.fornecedor', 'fornecedor')
            .innerJoin('saida.lote', 'lote')
            .where('empresa.id = :empresa', { empresa })
            .andWhere(w => {
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
            .innerJoin('saida.produto', 'produto')
            .innerJoin('saida.fornecedor', 'fornecedor')
            .innerJoin('saida.lote', 'lote')
            .where('saida.empresa = :empresa', { empresa })
            .andWhere(w => {
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