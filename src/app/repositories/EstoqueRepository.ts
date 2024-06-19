import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import IEstoque from "../interfaces/IEstoque";
import Estoque from "../models/Estoque";

class EstoqueRepository extends Estoque {
    private estoqueRepository = AppDataSource.getRepository(Estoque);

    public getEstoques = ({empresa, params}: {empresa: any, params?: any}): Promise<IEstoque[]> => {
        return this.estoqueRepository
            .createQueryBuilder('categoria')
            .innerJoin('categoria.empresa', 'empresa')
            .select('categoria')
            .addSelect('empresa')
            .where('empresa.id = :empresa', { empresa })
            .skip(params.offset)
            .take(50)
            .getMany();
    }

    public getEstoque = ({empresa, id}: {empresa: number, id: number}) => {
        const queryBuilder = this.estoqueRepository
            .createQueryBuilder('categoria');

        queryBuilder.where('categoria.empresa = :empresa', { empresa });
        queryBuilder.where('categoria.id = :id', { id });
        
        return queryBuilder.getOne();
    }

    public createNewEstoque = (Estoque: IEstoque) => {
        const newEstoque = this.estoqueRepository.create(Estoque as DeepPartial<Estoque>);
        return this.estoqueRepository.save(newEstoque);
    }

    public updateEstoque = (Estoque: IEstoque) => {
        return this.estoqueRepository.save(Estoque as DeepPartial<Estoque>);
    }

    public deleteEstoque = (id: number) => {
        return this.estoqueRepository.delete(id);
    }
}

export default new EstoqueRepository;