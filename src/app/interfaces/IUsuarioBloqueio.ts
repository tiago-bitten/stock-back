import IEmpresa from "./IEmpresa";
import IEstoque from "./IEstoque";
import IUsuario from "./IUsuario";

export default interface IUsuarioBloqueio {
    id?: number,
    empresa: number | IEmpresa,
    permissao: number,
    usuario: number | IUsuario,
    estoque: number | IEstoque,
    createdAt?: Date,
    updatedAt?: Date
}