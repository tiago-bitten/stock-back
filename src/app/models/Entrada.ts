import { Entity, Column, Index, CreateDateColumn, ManyToOne } from 'typeorm';
import Empresa from './Empresa';

@Entity('entrada')
@Index(["empresa", "id"], { unique: true })
class Entrada {
    @ManyToOne(() => Empresa, (empresa) => empresa.entrada)
    empresa: number;

    @Column('int', { nullable: false })
    id: number;

    @Column('int', { nullable: false })
    lote: number;

    @Column('int', { nullable: false })
    produto: number;

    @Column('int', { nullable: false })
    quantidade: number;

    @Column('int', { nullable: false })
    fornecedor: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}

export default Entrada;