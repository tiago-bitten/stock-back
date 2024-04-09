import { Entity, Column, Index } from 'typeorm';

@Entity('lote')
@Index(["account", "id"], { unique: true })
class Lote {
    @Column('int', { nullable: false })
    account: number;

    @Column('int', { nullable: false })
    id: number;

    @Column('int', { nullable: false })
    estoque: number;

    @Column('date', { nullable: false })
    data: Date;

}

export default Lote;