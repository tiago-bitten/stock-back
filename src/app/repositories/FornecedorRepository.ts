import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import IFornecedor from "../interfaces/IFornecedor";
import Fornecedor from "../models/Fornecedor";

class FornecedorRepository {
    private fornecedorRepository = AppDataSource.getRepository(Fornecedor);

    public getFornecedores = ({empresa, params}: {empresa: any, params: { skip: number, descricao?: string, cnpj?: string, email?: string, telefone?: string, logradouro?: string }}): Promise<IFornecedor[]> => {
        return this.fornecedorRepository
            .createQueryBuilder('fornecedor')
            .select('fornecedor')
            .where('empresa.id = :empresa', { empresa })
            .andWhere(w => {
                if (params.descricao) {
                    w.andWhere('fornecedor.descricao LIKE :nome', { nome: `%${params.descricao}%` });
                }
                if (params.cnpj) {
                    w.andWhere('fornecedor.cnpj LIKE :cnpj', { cnpj: `%${params.cnpj}%` });
                }
                if (params.email) {
                    w.andWhere('fornecedor.email LIKE :email', { email: `%${params.email}%` });
                }
                if (params.telefone) {
                    w.andWhere('fornecedor.telefone LIKE :telefone', { telefone: `%${params.telefone}%` });
                }
                if (params.logradouro) {
                    w.andWhere('fornecedor.logradouro LIKE :logradouro', { logradouro: `%${params.logradouro}%` });
                }
            })
            .skip(params.skip)
            .take(50)
            .getMany();
    }

    public getFornecedor = ({empresa, id}: {empresa: number, id: number}) => {
        const fornecedor = this.fornecedorRepository
            .createQueryBuilder('fornecedor')
            .select('fornecedor')
            .where('fornecedor.empresa = :empresa', { empresa })
            .andWhere('fornecedor.id = :id', { id })
            .getOne();
        
        return fornecedor;
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