import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
class User {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column('varchar', { length: 150, nullable: false })
    name!: string;

    @Column('varchar', { length: 150, unique: true, nullable: false })
    email!: string;

    @Column('varchar', { length: 11, unique: true, nullable: false })
    CPF!: string;
}

export default User;