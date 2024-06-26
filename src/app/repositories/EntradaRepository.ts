import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import IEntrada from "../interfaces/IEntrada";
import Entrada from "../models/Entrada";

class EntradaRepository extends Entrada {
    private entradaRepository = AppDataSource.getRepository(Entrada);

    public getEntradas = ({empresa, params}: {empresa: any, params: { skip: number, lote?: number, produto?: number, fornecedor?: number }}): Promise<IEntrada[]> => {
        return this.entradaRepository
            .createQueryBuilder('entrada')
            .innerJoin('entrada.lote', 'lote')
            .innerJoin('entrada.produto', 'produto')
            .innerJoin('entrada.fornecedor', 'fornecedor')
            .select('entrada')
            .addSelect('lote')
            .addSelect('produto')
            .addSelect('fornecedor')
            .where(w => {
                w.where('empresa.id = :empresa', { empresa })

                if (params.lote) {
                    w.andWhere('fornecedor.id = :fornecedor', { fornecedor: params.fornecedor });
                }

                if (params.produto) {
                    w.andWhere('produto.id = :produto', { produto: params.produto });
                }

                if (params.fornecedor) {
                    w.andWhere('fornecedor.id = :fornecedor', { fornecedor: params.fornecedor });
                }
            })
            .skip(params.skip)
            .take(50)
            .getMany();
    }

    public getEntrada = ({empresa, id, lote, produto, fornecedor}: {empresa: number, id?: number, lote?: number, produto?: number, fornecedor?: number}) => {
        return this.entradaRepository
            .createQueryBuilder('entrada')
            .innerJoin('entrada.lote', 'lote')
            .innerJoin('entrada.produto', 'produto')
            .innerJoin('entrada.fornecedor', 'fornecedor')
            .select('entrada')
            .addSelect('lote')
            .addSelect('produto')
            .addSelect('fornecedor')
            .where(w => {
                w.where('entrada.empresa = :empresa', { empresa })

                if (id) {
                    w.andWhere('entrada.id = :id', { id });
                }

                if (lote) {
                    w.andWhere('fornecedor.id = :fornecedor', { fornecedor: fornecedor });
                }

                if (produto) {
                    w.andWhere('produto.id = :produto', { produto: produto });
                }

                if (fornecedor) {
                    w.andWhere('fornecedor.id = :fornecedor', { fornecedor: fornecedor });
                }
            })
            .getOne();
    }

    public createNewEntrada = (Entrada: IEntrada) => {
        const newEntrada = this.entradaRepository.create(Entrada as DeepPartial<Entrada>);
        return this.entradaRepository.save(newEntrada);
    }

    public updateEntrada = (Entrada: IEntrada) => {
        return this.entradaRepository.save(Entrada as DeepPartial<Entrada>);
    }

    public deleteEntrada = (id: number) => {
        return this.entradaRepository.delete(id);
    }
}

export default new EntradaRepository;