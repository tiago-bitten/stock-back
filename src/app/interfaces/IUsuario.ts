export default interface IUsuario {
    id?: number,
    account?: number,
    nome: string,
    email: string,
    cpf: string,
    senha: string,
    cargo?: number
}