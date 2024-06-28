import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import IFornecedorProduto from "../interfaces/IFornecedorProduto";
import FornecedorProduto from "../models/FornecedorProduto";

class FornecedorProdutoRepository {
    private fornecedorProdutoRepository = AppDataSource.getRepository(FornecedorProduto);

    public getFornecedorProdutos = ({empresa, params}: {empresa: any, params: { skip: number, fornecedor?: number, produto?: number }}): Promise<IFornecedorProduto[]> => {
        return this.fornecedorProdutoRepository
            .createQueryBuilder('fornecedorProduto')
            .leftJoin('fornecedorProduto.fornecedor', 'fornecedor')
            .leftJoin('fornecedorProduto.produto', 'produto')
            .select('fornecedorProduto')
            .addSelect('fornecedor')
            .addSelect('produto')
            .where(w => {
                w.where('produto.empresa = :empresa', { empresa })

                if (params.fornecedor) {
                    w.andWhere('fornecedor.id = :fornecedor', { fornecedor: params.fornecedor });
                }

                if (params.produto) {
                    w.andWhere('produto.id = :produto', { produto: params.produto });
                }
            })
            .skip(params.skip)
            .take(50)
            .getMany();
    }

    public getFornecedorProduto = ({empresa, id}: {empresa: number, id: number}) => {
        const queryBuilder = this.fornecedorProdutoRepository
            .createQueryBuilder('fornecedorProduto')
            .leftJoin('fornecedorProduto.fornecedor', 'fornecedor')
            .leftJoin('fornecedorProduto.produto', 'produto')
            .select('fornecedorProduto')
            .addSelect('fornecedor')
            .addSelect('produto')
            .where('produto.empresa = :empresa', { empresa })
            .andWhere('fornecedorProduto.id = :id', { id })
            .getOne();
        
        return queryBuilder;
    }

    public createNewFornecedorProduto = (fornecedorProduto: IFornecedorProduto) => {
        const newFornecedorProduto = this.fornecedorProdutoRepository.create(fornecedorProduto as DeepPartial<FornecedorProduto>);
        return this.fornecedorProdutoRepository.save(newFornecedorProduto);
    }

    public updateFornecedorProduto = (fornecedorProduto: IFornecedorProduto) => {
        return this.fornecedorProdutoRepository.save(fornecedorProduto as DeepPartial<FornecedorProduto>);
    }
    
    public deleteFornecedorProduto = (id: number) => {
        return this.fornecedorProdutoRepository.delete(id);
    }
}

export default new FornecedorProdutoRepository;