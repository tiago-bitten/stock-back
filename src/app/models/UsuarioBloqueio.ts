import { Entity, Column, Index } from 'typeorm';

@Entity('usuario_bloqueio')
@Index(["account", "usuario", "estoque"], { unique: true })
class UsuarioBloqueio {
    @Column('int', { nullable: false })
    account: number;

    @Column('int', { nullable: false })
    usuario: number;

    @Column('int', { nullable: false })
    estoque: number;

    @Column('int', { nullable: false })
    permissao: number;
}

export default UsuarioBloqueio;