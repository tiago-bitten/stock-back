import { Entity, Column, Index, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import Empresa from './Empresa';
import Produto from './Produto';

@Entity('categoria')
@Index(["empresa", "id"], { unique: true })
class Categoria {
    @ManyToOne(() => Empresa, (empresa) => empresa.categoria)
    empresa: number;

    @Column('int', { nullable: false })
    id: number;

    @Column('varchar', { length: 150, nullable: false })
    descricao: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => Produto, (produto) => produto.categoria)
    produto: Produto[];

}

export default Categoria;