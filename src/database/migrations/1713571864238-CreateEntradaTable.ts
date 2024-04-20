import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEntradaTable1713571864238 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'entrada',
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
                        name: 'quantidade',
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
                        name: 'lote',
                        type: 'int',
                    },
                    {
                        name: 'produto',
                        type: 'int',
                    },
                    {
                        name: 'fornecedor',
                        type: 'int',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FKEntradaEmpresa',
                        columnNames: ['empresa'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'empresa',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'FKEntradaLote',
                        columnNames: ['lote'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'lote',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'FKEntradaProduto',
                        columnNames: ['produto'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'produto',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'FKEntradaFornecedor',
                        columnNames: ['fornecedor'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'fornecedor',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('entrada');
    }
}