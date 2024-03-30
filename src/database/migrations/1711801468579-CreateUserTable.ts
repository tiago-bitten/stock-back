import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1711801468579 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '150',
                        isNullable: false
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '150',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'CPF',
                        type: 'varchar',
                        length: '11',
                        isNullable: false,
                        isUnique: true
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user');
    }

}
