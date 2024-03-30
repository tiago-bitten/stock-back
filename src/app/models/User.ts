import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
class User {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column('varchar', { length: 150, nullable: false })
    name!: string;

    @Column('varchar', { length: 150, unique: true, nullable: false })
    email!: string;

    @Column('int', { unique: true, nullable: false })
    CPF!: number;
}

export default User;