import { Entity, Column, Index, CreateDateColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Empresa from './Empresa';
import Estoque from './Estoque';
import Entrada from './Entrada';
import Saida from './Saida';

@Entity('lote')
@Index(["empresa", "id"], { unique: true })
class Lote {
    @ManyToOne(() => Empresa, (empresa) => empresa.lote)
    empresa: number;

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('date', { nullable: false })
    data: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => Estoque, (estoque) => estoque.lote)
    estoque: number;

    @OneToMany(() => Entrada, (entrada) => entrada.lote)
    entrada: Entrada[];

    @OneToMany(() => Saida, (saida) => saida.fornecedor)
    saida: Saida[];
}

export default Lote;