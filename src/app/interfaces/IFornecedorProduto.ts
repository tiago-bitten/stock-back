import IEmpresa from "./IEmpresa";
import IFornecedor from "./IFornecedor";
import IProduto from "./IProduto";

export default interface IFornecedorProduto {
    id?: number,
    empresa: number | IEmpresa,
    fornecedor: number | IFornecedor,
    produto: number | IProduto,
    createdAt?: Date,
    updatedAt?: Date
}