import { Entity, Column, Index, CreateDateColumn, ManyToOne } from 'typeorm';
import Empresa from './Empresa';

@Entity('usuario_bloqueio')
@Index(["empresa", "usuario", "estoque"], { unique: true })
class UsuarioBloqueio {
    @ManyToOne(() => Empresa, (empresa) => empresa.usuarioBloqueio)
    empresa: number;

    @Column('int', { nullable: false })
    usuario: number;

    @Column('int', { nullable: false })
    estoque: number;

    @Column('int', { nullable: false })
    permissao: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}

export default UsuarioBloqueio;