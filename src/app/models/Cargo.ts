import { Entity, Column, Index, CreateDateColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Empresa from './Empresa';
import Usuario from './Usuario';

@Entity('cargo')
@Index(["empresa", "id"], { unique: true })
class Cargo {
    @ManyToOne(() => Empresa, (empresa) => empresa.cargo)
    empresa: number;

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { length: 150, nullable: false })
    descricao: string;
    
    @OneToMany(() => Usuario, (usuario) => usuario.cargo)
    usuario: Usuario[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}

export default Cargo;