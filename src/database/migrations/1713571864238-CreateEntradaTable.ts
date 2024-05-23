import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEntradaTable1713571864238 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'entrada',
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
                        name: 'quantidade',
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
                        name: 'loteId',
                        type: 'int',
                    },
                    {
                        name: 'produtoId',
                        type: 'int',
                    },
                    {
                        name: 'fornecedorId',
                        type: 'int',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FKEntradaEmpresa',
                        columnNames: ['empresaId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'empresa',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'FKEntradaLote',
                        columnNames: ['loteId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'lote',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'FKEntradaProduto',
                        columnNames: ['produtoId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'produto',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'FKEntradaFornecedor',
                        columnNames: ['fornecedorId'],
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
        await queryRunner.dropTable('entrada');
    }
}