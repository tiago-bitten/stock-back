import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import IProduto from "../interfaces/IProduto";
import Produto from "../models/Produto";
import moment, { Moment } from "moment";

class ProdutoRepository {
    private produtoRepository = AppDataSource.getRepository(Produto);

    public getProducts = ({empresa, params}: {empresa: any, params: { 
            skip: number,
            descricao?: string,
            custo?: number,
            preco?: number,
            quantidadeMinima?: number,
            quantidadeMaxima?: number,
            validade?: Date | moment.Moment,
            categoria?: number
        }}): Promise<IProduto[]> => {
        return this.produtoRepository
            .createQueryBuilder('produto')
            .innerJoin('produto.categoria', 'categoria')
            .select('produto')
            .addSelect('categoria')
            .where(w => {
                w.where('produto.empresa = :empresa', { empresa })

                if (params.descricao) {
                    w.andWhere('produto.descricao LIKE :descricao', { descricao: `%${params.descricao}%` });
                }

                if (params.custo) {
                    w.andWhere('produto.custo = :custo', { custo: params.custo });
                }

                if (params.preco) {
                    w.andWhere('produto.preco = :preco', { preco: params.preco });
                }

                if (params.quantidadeMinima) {
                    w.andWhere('produto.quantidadeMinima = :quantidadeMinima', { quantidadeMinima: params.quantidadeMinima });
                }

                if (params.quantidadeMaxima) {
                    w.andWhere('produto.quantidadeMaxima = :quantidadeMaxima', { quantidadeMaxima: params.quantidadeMaxima });
                }

                if (params.validade) {
                    w.andWhere('produto.validade = :validade', { validade: params.validade });
                }

                if (params.categoria) {
                    w.andWhere('produto.categoria = :categoria', { categoria: params.categoria });
                }
            })
            .skip(params.skip)
            .take(50)
            .getMany();
    }

    public getProduct = ({empresa, id}: {empresa: number, id: number}) => {
        const product = this.produtoRepository
            .createQueryBuilder('produto')
            .select('produto')
            .where('produto.empresa = :empresa', { empresa })
            .andWhere('produto.id = :id', { id })
            .getOne();

        return product;
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