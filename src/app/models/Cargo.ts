import { Entity, Column, Index, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import Empresa from './Empresa';
import Usuario from './Usuario';

@Entity('cargo')
@Index(["empresa", "id"], { unique: true })
class Cargo {
    @ManyToOne(() => Empresa, (empresa) => empresa.cargo)
    empresa: number;

    @Column('int', { nullable: false })
    id: number;
    
    @OneToMany(() => Usuario, (usuario) => usuario.cargo)
    usuario: Usuario[];

    @Column('varchar', { length: 150, nullable: false })
    descricao: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}

export default Cargo;