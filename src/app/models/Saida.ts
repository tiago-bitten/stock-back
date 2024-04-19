import { Entity, Column, Index, CreateDateColumn, ManyToOne } from 'typeorm';
import Empresa from './Empresa';
import Lote from './Lote';
import Produto from './Produto';
import Fornecedor from './Fornecedor';

@Entity('saida')
@Index(["empresa", "id"], { unique: true })
class Saida {
    @ManyToOne(() => Empresa, (empresa) => empresa.saida)
    empresa: number;

    @Column('int', { nullable: false })
    id: number;

    @Column('int', { nullable: false })
    quantidade: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => Lote, (lote) => lote.saida)
    lote: number;

    @ManyToOne(() => Produto, (produto) => produto.saida)
    produto: number;

    @ManyToOne(() => Fornecedor, (fornecedor) => fornecedor.saida)
    fornecedor: number;
}

export default Saida;