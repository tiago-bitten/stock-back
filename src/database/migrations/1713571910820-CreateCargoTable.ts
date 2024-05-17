import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCargoTable1713571910820 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'cargo',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'empresa',
                        type: 'int',
                        isPrimary: true,
                    },
                    {
                        name: 'descricao',
                        type: 'varchar',
                        length: '150',
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
                        name: 'FKCargoEmpresa',
                        referencedTableName: 'empresa',
                        referencedColumnNames: ['id'],
                        columnNames: ['empresa'],
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cargo');
    }

}
