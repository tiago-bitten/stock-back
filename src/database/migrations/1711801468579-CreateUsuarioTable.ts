import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsuarioTable1711801468579 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'usuario',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'empresaId',
                        type: 'int',
                        isPrimary: true,
                        isNullable: false
                    },
                    {
                        name: 'nome',
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
                        name: 'cpf',
                        type: 'varchar',
                        length: '11',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'senha',
                        type: 'varchar',
                        length: '60',
                        isNullable: false
                    },
                    {
                        name: 'cargo',
                        type: 'int',
                        isNullable: true
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
        await queryRunner.dropTable('usuario');
    }

}
