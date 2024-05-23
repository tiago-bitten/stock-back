import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsuarioBloqueioTable1713571925760 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'usuario_bloqueio',
                columns: [
{
                        name: 'empresaId',
                        type: 'int'
                    },
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'permissao',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'estoqueId',
                        type: 'int',
                    },
                    {
                        name: 'usuarioId',
                        type: 'int',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FKUsuarioBloqueioEmpresa',
                        columnNames: ['empresaId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'empresa',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'FKUsuarioBloqueioEstoque',
                        columnNames: ['estoqueId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'estoque',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'FKUsuarioBloqueioUsuario',
                        columnNames: ['usuarioId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'usuario',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('usuario_bloqueio');
    }

}