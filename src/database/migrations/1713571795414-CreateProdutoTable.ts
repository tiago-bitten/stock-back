import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProdutoTable1713571795414 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'produto',
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
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FKProdutoEmpresa',
                        columnNames: ['empresa'],
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
        queryRunner.dropTable('produto');
    }

}