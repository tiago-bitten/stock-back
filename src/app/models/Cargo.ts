import { Entity, Column, Index } from 'typeorm';

@Entity('cargo')
@Index(["empresa", "id"], { unique: true })
class Cargo {
    @Column('int', { nullable: false })
    empresa: number;

    @Column('int', { nullable: false })
    id: number;

    @Column('varchar', { length: 150, nullable: false })
    descricao: string;
}

export default Cargo;