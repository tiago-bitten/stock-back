import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFornecedorProdutoTable1713571832453 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'fornecedor_produto',
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
                        name: 'created_at',
                        type: 'timestamp',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                    },
                    {
                        name: 'fornecedor',
                        type: 'int',
                    },
                    {
                        name: 'produto',
                        type: 'int',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FKFornecedorProdutoEmpresa',
                        columnNames: ['empresa'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'empresa',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'FKFornecedorProdutoFornecedor',
                        columnNames: ['fornecedor'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'fornecedor',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'FKFornecedorProdutoProduto',
                        columnNames: ['produto'],
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
        queryRunner.dropTable('fornecedor_produto');
    }
}