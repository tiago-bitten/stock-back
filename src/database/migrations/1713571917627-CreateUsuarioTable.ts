import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsuarioTable1713571917627 implements MigrationInterface {

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
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'empresa',
                        type: 'int',
                        isPrimary: true,
                    },
                    {
                        name: 'nome',
                        type: 'varchar',
                        length: '150',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '150',
                        isUnique: true,
                    },
                    {
                        name: 'cpf',
                        type: 'varchar',
                        length: '11',
                        isUnique: true,
                    },
                    {
                        name: 'senha',
                        type: 'varchar',
                        length: '60',
                    },
                    {
                        name: 'cargo',
                        type: 'int',
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
                        name: 'FKUsuarioEmpresa',
                        referencedTableName: 'empresa',
                        referencedColumnNames: ['id'],
                        columnNames: ['empresa'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'FKUsuarioCargo',
                        referencedTableName: 'cargo',
                        referencedColumnNames: ['id'],
                        columnNames: ['cargo'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('usuario');
    }

}
