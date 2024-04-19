import { Entity, Column, Index, CreateDateColumn, ManyToOne } from 'typeorm';
import Empresa from './Empresa';
import Estoque from './Estoque';

@Entity('usuario_bloqueio')
@Index(["empresa", "usuario", "estoque"], { unique: true })
class UsuarioBloqueio {
    @ManyToOne(() => Empresa, (empresa) => empresa.usuarioBloqueio)
    empresa: number;

    @Column('int', { nullable: false })
    usuario: number;

    @Column('int', { nullable: false })
    permissao: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => Estoque, (estoque) => estoque.usuarioBloqueio)
    estoque: number;
}

export default UsuarioBloqueio;