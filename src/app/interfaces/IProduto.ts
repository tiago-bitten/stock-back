import ICategoria from "./ICategoria";
import IEmpresa from "./IEmpresa";

export default interface IProduto {
    id?: number,
    empresa: number | IEmpresa,
    descricao: string,
    custo: number,
    preco: number,
    quantidadeMinima: number,
    quantidadeMaxima: number,
    validade: Date,
    categoria: number | ICategoria,
    createdAt?: Date,
    updatedAt?: Date
}