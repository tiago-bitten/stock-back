import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import IFornecedor from "../interfaces/IFornecedor";
import Fornecedor from "../models/Fornecedor";

const fornecedorRepository = AppDataSource.getRepository(Fornecedor);

class FornecedorRepository {
    public getFornecedores = (): Promise<IFornecedor[]> => {
        return fornecedorRepository.find();
    }

    public getFornecedor = ({id}: {id?: number}): Promise<IFornecedor | null> => {
        const whereClause = id ? { id } : null;
        return whereClause ? fornecedorRepository.findOne({ where: whereClause }) : Promise.resolve(null);
    }

    public createNewFornecedor = (fornecedor: IFornecedor) => {
        const newFornecedor = fornecedorRepository.create(fornecedor as DeepPartial<Fornecedor>);
        return fornecedorRepository.save(newFornecedor);
    }

    public updateFornecedor = (fornecedor: IFornecedor) => {
        return fornecedorRepository.save(fornecedor as DeepPartial<Fornecedor>);
    }
    
    public deleteFornecedor = (id: number) => {
        return fornecedorRepository.delete(id);
    }
}

export default new FornecedorRepository;