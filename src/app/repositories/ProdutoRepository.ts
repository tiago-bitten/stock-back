import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import IProduto from "../interfaces/IProduto";
import Produto from "../models/Produto";

class ProdutoRepository {
    private produtoRepository = AppDataSource.getRepository(Produto);

    public getProducts = ({empresa, params}: {empresa: any, params?: any}): Promise<IProduto[]> => {
        return this.produtoRepository
            .createQueryBuilder('produto')
            .innerJoin('produto.empresa', 'empresa')
            .select('produto')
            .addSelect('empresa')
            .where('empresa.id = :empresa', { empresa })
            .skip(params.offset)
            .take(50)
            .getMany();
    }

    public getProduct = ({empresa, id}: {empresa: number, id: number}) => {
        const queryBuilder = this.produtoRepository
            .createQueryBuilder('produto');

        queryBuilder.where('produto.empresa = :empresa', { empresa });
        queryBuilder.where('produto.id = :id', { id });
        
        return queryBuilder.getOne();
    }

    public createNewProduct = (product: IProduto) => {
        const newProduct = this.produtoRepository.create(product as DeepPartial<Produto>);
        return this.produtoRepository.save(newProduct);
    }

    public updateProduct = (product: IProduto) => {
        return this.produtoRepository.save(product as DeepPartial<Produto>);
    }

    public deleteProduct = (id: number) => {
        return this.produtoRepository.delete(id);
    }
}

export default new ProdutoRepository;