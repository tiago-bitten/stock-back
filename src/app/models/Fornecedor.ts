import { Entity, Column, Index } from 'typeorm';

@Entity('fornecedor')
@Index(["account", "id"], { unique: true })
class Fornecedor {
    @Column('int', { nullable: false })
    account: number;

    @Column('int', { nullable: false })
    id: number;

    @Column('varchar', { length: 150, nullable: false })
    descricao: string;

    @Column('varchar', { length: 250, nullable: false })
    email: string;

    @Column('varchar', { length: 18, nullable: false })
    telefone: string;

    @Column('varchar', { length: 20, nullable: false })
    cnpj: string;

    @Column('varchar', { length: 250, nullable: false })
    logradouro: string;

    @Column('int', { nullable: false })
    cidade: number;
}

export default Fornecedor;