import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import IProduto from "../interfaces/IProduto";
import Produto from "../models/Produto";

const produtoRepository = AppDataSource.getRepository(Produto);

class ProdutoRepository {
    public getProducts = (): Promise<IProduto[]> => {
        return produtoRepository.find();
    }

    public getProduct = ({id, descricao}: {id?: number, descricao?: string}): Promise<IProduto | null> => {
        const whereClause = id ? { id } : descricao ? { descricao } : null;
        return whereClause ? produtoRepository.findOne({ where: whereClause, relations: ['empresa'] }) : Promise.resolve(null);
    }

    public createNewProduct = (product: IProduto) => {
        const newProduct = produtoRepository.create(product as DeepPartial<Produto>);
        return produtoRepository.save(newProduct);
    }

    public updateProduct = (product: IProduto) => {
        return produtoRepository.save(product as DeepPartial<Produto>);
    }

    public deleteProduct = (id: number) => {
        return produtoRepository.delete(id);
    }
}

export default new ProdutoRepository;