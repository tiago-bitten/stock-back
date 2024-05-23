import { Entity, Column, Index, CreateDateColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Empresa from './Empresa';
import Entrada from './Entrada';
import FornecedorProduto from './FornecedorProduto';
import Categoria from './Categoria';
import Saida from './Saida';
import Lote from './Lote';

@Entity('produto')
@Index(["empresa", "id"], { unique: true })
class Produto {
    @ManyToOne(() => Empresa, (empresa) => empresa.produto)
    empresa: number;

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { length: 150, nullable: false })
    descricao: string;

    @Column('float', { nullable: false })
    custo: number;

    @Column('float', { nullable: false })
    preco: number;

    @Column('int', { nullable: false })
    quantidadeMinima: number;

    @Column('int', { nullable: false })
    quantidadeMaxima: number;

    @Column('date', { nullable: false })
    validade: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => Lote, (lote) => lote.produto)
    lote: Lote[]

    @OneToMany(() => Entrada, (entrada) => entrada.produto)
    entrada: Entrada[]

    @OneToMany(() => FornecedorProduto, (fornecedorProduto) => fornecedorProduto.produto)
    fornecedorProduto: FornecedorProduto[];
    
    @OneToMany(() => Saida, (saida) => saida.produto)
    saida: Saida[];

    @ManyToOne(() => Categoria, (categoria) => categoria.produto)
    categoria: number;	
}

export default Produto;