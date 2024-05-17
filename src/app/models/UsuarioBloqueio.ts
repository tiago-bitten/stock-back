import { Entity, Column, Index, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Empresa from './Empresa';
import Estoque from './Estoque';
import Usuario from './Usuario';

@Entity('usuario_bloqueio')
@Index(["empresa", "usuario", "estoque"], { unique: true })
class UsuarioBloqueio {
    @ManyToOne(() => Empresa, (empresa) => empresa.usuarioBloqueio)
    empresa: number;

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('int', { nullable: false })
    permissao: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => Estoque, (estoque) => estoque.usuarioBloqueio)
    estoque: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.usuarioBloqueio)
    usuario: number;
}

export default UsuarioBloqueio;