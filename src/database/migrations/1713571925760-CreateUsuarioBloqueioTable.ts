import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsuarioBloqueioTable1713571925760 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'usuario_bloqueio',
                columns: [
                    {
                        name: 'empresa',
                        type: 'int',
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
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                    },
                    {
                        name: 'estoque',
                        type: 'int',
                    },
                    {
                        name: 'usuario',
                        type: 'int',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FKUsuarioBloqueioEmpresa',
                        columnNames: ['empresa'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'empresa',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'FKUsuarioBloqueioEstoque',
                        columnNames: ['estoque'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'estoque',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'FKUsuarioBloqueioUsuario',
                        columnNames: ['usuario'],
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
        queryRunner.dropTable('usuario_bloqueio');
    }

}