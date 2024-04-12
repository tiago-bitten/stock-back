import { Entity, Column, Index } from 'typeorm';

@Entity('fornecedor_produto')
@Index(["account", "fornecedor", "produto"], { unique: true })
class FornecedorProduto {
    @Column('int', { nullable: false })
    account: number;

    @Column('int', { nullable: false })
    fornecedor: number;

    @Column('int', { nullable: false })
    produto: number;
}

export default FornecedorProduto;