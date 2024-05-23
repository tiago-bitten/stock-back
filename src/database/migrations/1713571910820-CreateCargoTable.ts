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
                        name: 'empresaId',
                        type: 'int'
                    },
                    {
                        name: 'descricao',
                        type: 'varchar',
                        length: '150',
                    },
                    {
                        name: 'nivel',
                        type: 'enum',
                        isNullable: false,
                        enumName: 'nivel_enum',
                        enum: [
                            'Admin',
                            'Funcionario',
                        ]
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
                        columnNames: ['empresaId'],
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cargo');
    }

}
