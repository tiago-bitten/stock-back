import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProdutoTable1713571795414 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'produto',
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
                        name: 'descricao',
                        type: 'varchar',
                        length: '150',
                    },
                    {
                        name: 'custo',
                        type: 'float',
                    },
                    {
                        name: 'preco',
                        type: 'float',
                    },
                    {
                        name: 'quantidadeMinima',
                        type: 'int',
                    },
                    {
                        name: 'quantidadeMaxima',
                        type: 'int',
                    },
                    {
                        name: 'validade',
                        type: 'date',
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
                ],
                foreignKeys: [
                    {
                        name: 'FKProdutoEmpresa',
                        columnNames: ['empresaId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'empresa',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('produto');
    }

}