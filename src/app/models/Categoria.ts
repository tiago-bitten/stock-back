import { Entity, Column, Index } from 'typeorm';

@Entity('categoria')
@Index(["empresa", "id"], { unique: true })
class Categoria {
    @Column('int', { nullable: false })
    empresa: number;

    @Column('int', { nullable: false })
    id: number;

    @Column('varchar', { length: 150, nullable: false })
    descricao: string;
}

export default Categoria;