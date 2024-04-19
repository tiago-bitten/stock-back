import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEmpresaTable1712972515016 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'empresa',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'descricao',
                        type: 'varchar',
                        length: '150',
                        isNullable: false
                    },
                    {
                        name: 'cnpj',
                        type: 'varchar',
                        length: '25',
                        isNullable: false
                    },
                    {
                        name: 'telefone',
                        type: 'varchar',
                        length: '25',
                        isNullable: false
                    },
                    {
                        name: 'contrato',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'logradouro',
                        type: 'varchar',
                        length: '250',
                        isNullable: false
                    },
                    {
                        name: 'cidade',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'ativo',
                        type: 'boolean',
                        isNullable: false
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('empresa');
    }

}
