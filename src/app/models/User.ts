import { hashSync, compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { length: 150, nullable: false })
    name: string;

    @Column('varchar', { length: 150, unique: true, nullable: false })
    email: string;

    @Column('varchar', { length: 11, unique: true, nullable: false })
    CPF: string;

    @Column('varchar', { length: 25, nullable: false })
    password: string;

    setPassword = (password: string) => {
        return (this.password = hashSync(password, 10));
    };

    isValidPassword = (password: string) => {
        return compareSync(password, this.password);
    };

    generateJWT = () => {
        return jwt.sign(
            { email: this.email }, 
            'SECRET_KEY', 
            { expiresIn: '1h' }
        );
    };
}

export default User;