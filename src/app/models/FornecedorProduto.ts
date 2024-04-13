import { Entity, Column, Index, CreateDateColumn, ManyToOne } from 'typeorm';
import Empresa from './Empresa';

@Entity('fornecedor_produto')
@Index(["empresa", "fornecedor", "produto"], { unique: true })
class FornecedorProduto {
    @ManyToOne(() => Empresa, (empresa) => empresa.fornecedorProduto)
    empresa: number;

    @Column('int', { nullable: false })
    fornecedor: number;

    @Column('int', { nullable: false })
    produto: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}

export default FornecedorProduto;