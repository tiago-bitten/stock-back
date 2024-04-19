import { Entity, Column, Index, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import Empresa from './Empresa';
import Entrada from './Entrada';
import FornecedorProduto from './FornecedorProduto';
import Saida from './Saida';

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

    @OneToMany(() => Entrada, (entrada) => entrada.fornecedor)
    entrada: Entrada[];

    @OneToMany(() => FornecedorProduto, (fornecedorProduto) => fornecedorProduto.fornecedor)
    fornecedorProduto: FornecedorProduto[];

    @OneToMany(() => Saida, (saida) => saida.fornecedor)
    saida: Saida[];
}

export default Fornecedor;