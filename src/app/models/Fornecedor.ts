import { Entity, Column, Index, CreateDateColumn, ManyToOne } from 'typeorm';
import Empresa from './Empresa';

@Entity('fornecedor')
@Index(["empresa", "id"], { unique: true })
class Fornecedor {
    @ManyToOne(() => Empresa, (empresa) => empresa.fornecedor)
    empresa: number;

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

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}

export default Fornecedor;