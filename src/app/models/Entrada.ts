import { Entity, Column, Index } from 'typeorm';

@Entity('entrada')
@Index(["empresa", "id"], { unique: true })
class Entrada {
    @Column('int', { nullable: false })
    empresa: number;

    @Column('int', { nullable: false })
    id: number;

    @Column('int', { nullable: false })
    lote: number;

    @Column('int', { nullable: false })
    produto: number;

    @Column('int', { nullable: false })
    quantidade: number;

    @Column('int', { nullable: false })
    fornecedor: number;
}

export default Entrada;