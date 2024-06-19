import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import IEntrada from "../interfaces/IEntrada";
import Entrada from "../models/Entrada";

class EntradaRepository extends Entrada {
    private entradaRepository = AppDataSource.getRepository(Entrada);

    public getEntradas = ({empresa, params}: {empresa: any, params?: any}): Promise<IEntrada[]> => {
        return this.entradaRepository
            .createQueryBuilder('entrada')
            .innerJoin('entrada.empresa', 'empresa')
            .select('entrada')
            .addSelect('empresa')
            .where('empresa.id = :empresa', { empresa })
            .skip(params.offset)
            .take(50)
            .getMany();
    }

    public getEntrada = ({empresa, id, lote, produto, fornecedor}: {empresa:number, id?: number, lote?: number, produto?: number, fornecedor?: number}) => {
        const queryBuilder = this.entradaRepository
            .createQueryBuilder('entrada');

        queryBuilder.where('entrada.empresa = :empresa', { empresa });
        queryBuilder.where('entrada.id = :id', { id });
        
        return queryBuilder.getOne();
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