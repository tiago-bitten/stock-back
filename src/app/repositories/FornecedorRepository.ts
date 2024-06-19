import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import IFornecedor from "../interfaces/IFornecedor";
import Fornecedor from "../models/Fornecedor";

class FornecedorRepository {
    private fornecedorRepository = AppDataSource.getRepository(Fornecedor);

    public getFornecedores = ({empresa, params}: {empresa: any, params?: any}): Promise<IFornecedor[]> => {
        return this.fornecedorRepository
            .createQueryBuilder('categoria')
            .innerJoin('categoria.empresa', 'empresa')
            .select('categoria')
            .addSelect('empresa')
            .where('empresa.id = :empresa', { empresa })
            .skip(params.offset)
            .take(50)
            .getMany();
    }

    public getFornecedor = ({empresa, id}: {empresa: number, id: number}) => {
        const queryBuilder = this.fornecedorRepository
            .createQueryBuilder('fornecedor');

        queryBuilder.where('fornecedor.empresa = :empresa', { empresa });
        queryBuilder.where('fornecedor.id = :id', { id });
        
        return queryBuilder.getOne();
    }

    public createNewFornecedor = (fornecedor: IFornecedor) => {
        const newFornecedor = this.fornecedorRepository.create(fornecedor as DeepPartial<Fornecedor>);
        return this.fornecedorRepository.save(newFornecedor);
    }

    public updateFornecedor = (fornecedor: IFornecedor) => {
        return this.fornecedorRepository.save(fornecedor as DeepPartial<Fornecedor>);
    }
    
    public deleteFornecedor = (id: number) => {
        return this.fornecedorRepository.delete(id);
    }
}

export default new FornecedorRepository;