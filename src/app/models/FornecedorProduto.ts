import { Entity, Column, Index, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Empresa from './Empresa';
import Fornecedor from './Fornecedor';
import Produto from './Produto';

@Entity('fornecedor_produto')
@Index(["empresa", "fornecedor", "produto"], { unique: true })
class FornecedorProduto {
    @ManyToOne(() => Empresa, (empresa) => empresa.fornecedorProduto)
    empresa: number;

    @PrimaryGeneratedColumn('increment')
    id: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => Fornecedor, (fornecedor) => fornecedor.fornecedorProduto)
    fornecedor: number;

    @ManyToOne(() => Produto, (produto) => produto.fornecedorProduto)
    produto: number;
}

export default FornecedorProduto;