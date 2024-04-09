import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account')
class Account {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column('varchar', { length: 150, nullable: false })
    descricao: string;

    @Column('varchar', { length: 25, nullable: false })
    cnpj: string;

    @Column('varchar', { length: 25, nullable: false })
    telefone: string;

    @Column('int', { nullable: false })
    contrato: number;

    @Column('varchar', { length: 250, nullable: false })
    logradouro: string;

    @Column('int', { nullable: false })
    cidade: number;

    @Column('boolean', { nullable: false })
    ativo: boolean;

    @Column('int', { nullable: false })
    quantidadeUsuarios: number;
}

export default Account;