import Empresa from "../models/Empresa";

export default interface ICategoria {
    id?: number,
    empresa: number | Empresa,
    descricao: string,
    createdAt?: Date,
    updatedAt?: Date
}