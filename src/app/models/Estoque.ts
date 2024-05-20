import { Entity, Column, Index, CreateDateColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Empresa from './Empresa';
import UsuarioBloqueio from './UsuarioBloqueio';

@Entity('estoque')
@Index(["empresa", "id"], { unique: true })
class Estoque {
    @ManyToOne(() => Empresa, (empresa) => empresa.estoque)
    empresa: number;

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { length: 150, nullable: false })
    descricao: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => UsuarioBloqueio, (usuarioBloqueio) => usuarioBloqueio.estoque)
    usuarioBloqueio: UsuarioBloqueio[];
}

export default Estoque;