import { MigrationInterface, QueryRunner } from "typeorm";

export class AddForeignKeyEmpresaForUsuario1713040028097 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE usuario ADD FOREIGN KEY (empresa) REFERENCES empresa(id)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE usuario DROP FOREIGN KEY empresa`);
    }

}
