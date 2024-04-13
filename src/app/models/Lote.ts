import { Entity, Column, Index, CreateDateColumn, ManyToOne } from 'typeorm';
import Empresa from './Empresa';
import Estoque from './Estoque';

@Entity('lote')
@Index(["empresa", "id"], { unique: true })
class Lote {
    @ManyToOne(() => Empresa, (empresa) => empresa.lote)
    empresa: number;

    @Column('int', { nullable: false })
    id: number;

    @Column('date', { nullable: false })
    data: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => Estoque, (estoque) => estoque.lote)
    estoque: Estoque;
}

export default Lote;