export default interface IEmpresa {
    id?: number,
    descricao: string,
    cnpj: string,
    telefone: string,
    contrato: number,
    logradouro: string,
    cidade: number,
    ativo: boolean,
    quantidadeUsuarios: number
}