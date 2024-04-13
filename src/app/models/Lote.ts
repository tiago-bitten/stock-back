import { Entity, Column, Index } from 'typeorm';

@Entity('lote')
@Index(["empresa", "id"], { unique: true })
class Lote {
    @Column('int', { nullable: false })
    empresa: number;

    @Column('int', { nullable: false })
    id: number;

    @Column('int', { nullable: false })
    estoque: number;

    @Column('date', { nullable: false })
    data: Date;

}

export default Lote;