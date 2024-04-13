import { Entity, Column, Index } from 'typeorm';

@Entity('produto')
@Index(["empresa", "id"], { unique: true })
class Produto {
    @Column('int', { nullable: false })
    empresa: number;

    @Column('int', { nullable: false })
    id: number;

    @Column('varchar', { length: 150, nullable: false })
    descricao: string;

    @Column('int', { nullable: false })
    categoria: number;	

    @Column('int', { nullable: false })
    custo: number;

    @Column('float', { nullable: false })
    preco: number;

    @Column('int', { nullable: false })
    quantidadeMinima: number;

    @Column('int', { nullable: false })
    quantidadeMaxima: number;

    @Column('date', { nullable: false })
    validade: Date;
}

export default Produto;