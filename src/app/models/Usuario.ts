import { hashSync, compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Entity, Column, Index } from 'typeorm';

@Entity('usuario')
@Index(["account", "id"], { unique: true })
class Usuario {
    @Column('int', { nullable: false })
    account: number;

    @Column('int', { nullable: false })
    id: number;

    @Column('varchar', { length: 150, nullable: false })
    nome: string;

    @Column('varchar', { length: 150, unique: true, nullable: false })
    email: string;

    @Column('varchar', { length: 25, nullable: false })
    senha: string;

    @Column('int', { nullable: false })
    cargo: number;

    setPassword = (senha: string) => {
        return (this.senha = hashSync(senha, 10));
    };

    isValidPassword = (senha: string) => {
        return compareSync(senha, this.senha);
    };

    generateJWT = () => {
        return jwt.sign(
            { email: this.email }, 
            'SECRET_KEY', 
            { expiresIn: '1h' }
        );
    };
}

export default Usuario;