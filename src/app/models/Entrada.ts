import { Entity, Column, Index, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Empresa from './Empresa';
import Lote from './Lote';
import Produto from './Produto';
import Fornecedor from './Fornecedor';

@Entity('entrada')
@Index(["empresa", "id"], { unique: true })
class Entrada {
    @ManyToOne(() => Empresa, (empresa) => empresa.entrada)
    empresa: number;

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('int', { nullable: false })
    quantidade: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => Lote, (lote) => lote.entrada)
    lote: number;

    @ManyToOne(() => Produto, (produto) => produto.entrada)
    produto: number;

    @ManyToOne(() => Fornecedor, (fornecedor) => fornecedor.entrada)
    fornecedor: number;
}

export default Entrada;