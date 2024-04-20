import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFornecedorTable1713571805444 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'fornecedor',
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
                        name: 'email',
                        type: 'varchar',
                        length: '250',
                    },
                    {
                        name: 'telefone',
                        type: 'varchar',
                        length: '18',
                    },
                    {
                        name: 'cnpj',
                        type: 'varchar',
                        length: '20',
                    },
                    {
                        name: 'logradouro',
                        type: 'varchar',
                        length: '250',
                    },
                    {
                        name: 'cidade',
                        type: 'int',
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
                        name: 'FKFornecedorEmpresa',
                        referencedTableName: 'empresa',
                        referencedColumnNames: ['id'],
                        columnNames: ['empresa'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('fornecedor');    
    }

}