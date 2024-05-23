import { Entity, Column, Index, CreateDateColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Check } from 'typeorm';
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

    @Column('enum', { enum: ['Admin', 'Funcionario'], default: 'Funcionario' }) // Use enum type for nivel
    nivel: 'Admin' | 'Funcionario';
    
    @OneToMany(() => Usuario, (usuario) => usuario.cargo)
    usuario: Usuario[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}

export default Cargo;