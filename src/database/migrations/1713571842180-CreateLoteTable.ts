import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateLoteTable1713571842180 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'lote',
                columns: [
                    {
                        name: 'empresa',
                        type: 'int',
                        isPrimary: true,
                    },
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'data',
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
                    {
                        name: 'estoque',
                        type: 'int',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FKLoteEmpresa',
                        columnNames: ['empresa'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'empresa',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'FKLoteEstoque',
                        columnNames: ['estoque'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'estoque',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('lote');
    }

}