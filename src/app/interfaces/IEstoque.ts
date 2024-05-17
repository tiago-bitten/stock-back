import IEmpresa from "./IEmpresa";

export default interface IEstoque {
    id?: number,
    empresa: number | IEmpresa,
    descricao: string,
    createdAt?: Date,
    updatedAt?: Date
}