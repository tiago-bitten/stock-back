import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import Usuario from './Usuario';
import UsuarioBloqueio from './UsuarioBloqueio';
import Saida from './Saida';
import Cargo from './Cargo';
import Produto from './Produto';
import Lote from './Lote';
import Categoria from './Categoria';
import FornecedorProduto from './FornecedorProduto';
import Fornecedor from './Fornecedor';
import Estoque from './Estoque';
import Entrada from './Entrada';

@Entity('empresa')
class Empresa {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column('varchar', { length: 150, nullable: false })
    descricao: string;

    @Column('varchar', { length: 25, nullable: false })
    cnpj: string;

    @Column('varchar', { length: 25, nullable: false })
    telefone: string;

    @Column('int', { nullable: false })
    contrato: number;

    @Column('varchar', { length: 250, nullable: false })
    logradouro: string;

    @Column('int', { nullable: false })
    cidade: number;

    @Column('boolean', { nullable: false })
    ativo: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => Usuario, (usuario) => usuario.empresa)
    usuario: Usuario[];

    @OneToMany(() => UsuarioBloqueio, (usuarioBloqueio) => usuarioBloqueio.empresa)
    usuarioBloqueio: UsuarioBloqueio[];

    @OneToMany(() => Saida, (saida) => saida.empresa)
    saida: Saida[];
    
    @OneToMany(() => Cargo, (cargo) => cargo.empresa)
    cargo: Cargo[];

    @OneToMany(() => Produto, (produto) => produto.empresa)
    produto: Produto[];

    @OneToMany(() => Lote, (lote) => lote.empresa)
    lote: Lote[];

    @OneToMany(() => Categoria, (categoria) => categoria.empresa)
    categoria: Categoria[];

    @OneToMany(() => Fornecedor, (fornecedor) => fornecedor.empresa)
    fornecedor: Fornecedor[];

    @OneToMany(() => FornecedorProduto, (fornecedorProduto) => fornecedorProduto.empresa)
    fornecedorProduto: FornecedorProduto[];

    @OneToMany(() => Estoque, (estoque) => estoque.empresa)
    estoque: Estoque[];

    @OneToMany(() => Entrada, (entrada) => entrada.empresa)
    entrada: Entrada[];
}

export default Empresa;