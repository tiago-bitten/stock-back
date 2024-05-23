import IEmpresa from "./IEmpresa";
import IProduto from "./IProduto";

export default interface ILote {
    id?: number,
    empresa: number | IEmpresa,
    codigoBarras: string,
    quantidade: number,
    dataFabricacao: Date,
    dataVencimento: Date,
    observacoes: string,
    produto: number | IProduto,
    createdAt?: Date,
    updatedAt?: Date
}