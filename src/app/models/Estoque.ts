import { Entity, Column, Index, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import Empresa from './Empresa';
import Lote from './Lote';

@Entity('estoque')
@Index(["empresa", "id"], { unique: true })
class Estoque {
    @ManyToOne(() => Empresa, (empresa) => empresa.estoque)
    empresa: number;

    @Column('int', { nullable: false })
    id: number;

    @Column('varchar', { length: 150, nullable: false })
    descricao: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => Lote, (lote) => lote.estoque)
    lote: Lote[];
}

export default Estoque;