import IEmpresa from "./IEmpresa";
import IFornecedor from "./IFornecedor";
import IProduto from "./IProduto";

export default interface IEntrada {
    id?: number,
    empresa: number | IEmpresa,
    quantidade: number,
    lote: number,
    produto: number | IProduto,
    fornecedor: number | IFornecedor,
    createdAt?: Date,
    updatedAt?: Date
}