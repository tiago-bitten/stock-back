import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEmpresaTable1713571769283 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'empresa',
                columns: [
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
                        name: 'cnpj',
                        type: 'varchar',
                        length: '25',
                    },
                    {
                        name: 'telefone',
                        type: 'varchar',
                        length: '25',
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
                        name: 'ativo',
                        type: 'boolean',
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
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('empresa');
    }

}