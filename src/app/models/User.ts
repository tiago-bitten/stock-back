import { hashSync, compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

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

    @Column('varchar', { length: 60, nullable: false })
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword () {
        return (this.password = hashSync(this.password, 8));
    };
}

export default User;