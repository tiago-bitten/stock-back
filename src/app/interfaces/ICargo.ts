import IEmpresa from "./IEmpresa";

export default interface ICargo {
    id?: number,
    empresa: number | IEmpresa,
    descricao: string,
    createdAt?: Date,
    updatedAt?: Date
}