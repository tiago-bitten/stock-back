import { Entity, Column, Index, CreateDateColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Empresa from './Empresa';
import Estoque from './Estoque';
import Entrada from './Entrada';
import Saida from './Saida';
import Produto from './Produto';

@Entity('lote')
@Index(["empresa", "id"], { unique: true })
class Lote {
    @ManyToOne(() => Empresa, (empresa) => empresa.lote)
    empresa: number;

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { nullable: false, unique: true})
    codigoBarras: string;

    @Column('tinyint', { nullable: false })
    quantidade: number;

    @Column('date', { nullable: false })
    dataFabricacao: Date;

    @Column('date', { nullable: false })
    dataVencimento: Date;

    @Column('varchar')
    observacoes: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => Produto, (produto) => produto.lote)
    produto: number;

    @OneToMany(() => Entrada, (entrada) => entrada.lote)
    entrada: Entrada[];

    @OneToMany(() => Saida, (saida) => saida.fornecedor)
    saida: Saida[];
}

export default Lote;