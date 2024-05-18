import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFornecedorProdutoTable1713571832453 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'fornecedor_produto',
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
                        name: 'fornecedorId',
                        type: 'int',
                    },
                    {
                        name: 'produtoId',
                        type: 'int',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FKFornecedorProdutoEmpresa',
                        columnNames: ['empresaId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'empresa',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'FKFornecedorProdutoFornecedor',
                        columnNames: ['fornecedorId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'fornecedor',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'FKFornecedorProdutoProduto',
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
        await queryRunner.dropTable('fornecedor_produto');
    }
}