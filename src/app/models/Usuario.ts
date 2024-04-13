import { hashSync } from 'bcrypt';
import { Entity, Column, BeforeInsert, BeforeUpdate, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuario')
@Index(["account", "id"], { unique: true })
class Usuario {
    @Column('int', { nullable: false })
    account: number;

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

    @Column('int', { nullable: true })
    cargo: number;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword () {
        return (this.senha = hashSync(this.senha, 8));
    };
}

export default Usuario;