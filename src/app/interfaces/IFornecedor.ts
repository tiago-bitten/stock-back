import IEmpresa from "./IEmpresa";

export default interface IFornecedor {
    id?: number,
    empresa: number | IEmpresa,
    descricao: string,
    email: string,
    telefone: string,
    cnpj: string,
    logradouro: string,
    cidade: number,
    createdAt?: Date,
    updatedAt?: Date
}