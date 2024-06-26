import IEmpresa from "./IEmpresa";
import IFornecedor from "./IFornecedor";
import ILote from "./ILote";
import IProduto from "./IProduto";

export default interface ISaida {
    id?: number,
    empresa: number,
    quantidade: number,
    lote: number | ILote,
    produto: number | IProduto,
    fornecedor: number | IFornecedor,
    createdAt?: Date,
    updatedAt?: Date
}