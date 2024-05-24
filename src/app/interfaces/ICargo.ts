import IEmpresa from "./IEmpresa";

export default interface ICargo {
    id?: number,
    empresa: number | IEmpresa,
    descricao: string,
    nivel: 'ADMIN' | 'USER',
    createdAt?: Date,
    updatedAt?: Date
}