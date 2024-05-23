import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateLoteTable1713571842180 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'lote',
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
                        name: 'codigoBarras',
                        type: 'varchar',
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: 'quantidade',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'dataFabricacao',
                        type: 'date',
                        isNullable: false,
                    },
                    {
                        name: 'dataVencimento',
                        type: 'date',
                        isNullable: false,
                    },
                    {
                        name: 'observacoes',
                        type: 'varchar'
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
                        name: 'produtoId',
                        type: 'int',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FKLoteEmpresa',
                        columnNames: ['empresaId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'empresa',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'FKLoteProduto',
                        columnNames: ['produtoId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'produto',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('lote');
    }

}