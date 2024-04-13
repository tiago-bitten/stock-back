export default interface IUsuario {
    id?: number,
    empresa?: number,
    nome: string,
    email: string,
    cpf: string,
    senha?: string,
    cargo?: number
}