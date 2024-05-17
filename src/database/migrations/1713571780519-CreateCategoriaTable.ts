import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCategoriaTable1713571780519 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'categoria',
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
                        name: 'FKCategoriaEmpresa',
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
        queryRunner.dropTable('categoria');
    }

}