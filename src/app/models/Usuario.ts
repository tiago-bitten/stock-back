import { hashSync } from 'bcrypt';
import { Entity, Column, BeforeInsert, BeforeUpdate, Index, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';
import Empresa from './Empresa';
import Cargo from './Cargo';

@Entity('usuario')
@Index(["empresa", "id"], { unique: true })
class Usuario {
    @ManyToOne(() => Empresa, (empresa) => empresa.usuario)
    empresa: number;

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { length: 150, nullable: false })
    nome: string;

    @Column('varchar', { length: 150, unique: true, nullable: false })
    email: string;

    @Column('varchar', { length: 11, unique: true, nullable: false })
    cpf: string;

    @Column('varchar', { length: 60, nullable: false })
    senha: string;

    @ManyToOne(() => Cargo, (cargo) => cargo.usuario)
    cargo: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword () {
        return (this.senha = hashSync(this.senha, 8));
    };
}

export default Usuario;