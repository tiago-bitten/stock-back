import IEmpresa from "./IEmpresa";
import IEstoque from "./IEstoque";

export default interface ILote {
    id?: number,
    empresa: number | IEmpresa,
    data: Date,
    estoque: number | IEstoque,
    createdAt?: Date,
    updatedAt?: Date
}