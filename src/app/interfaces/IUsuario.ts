import ICargo from "./ICargo";
import IEmpresa from "./IEmpresa";

export default interface IUsuario {
    id?: number,
    empresa?: number,
    nome: string,
    email: string,
    cpf: string,
    senha?: string,
    cargo?: number | ICargo,
    createdAt?: Date,
    updatedAt?: Date
}