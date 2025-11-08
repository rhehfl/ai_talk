import { MigrationInterface, QueryRunner } from "typeorm";

export class Profileimage1762622665882 implements MigrationInterface {
    name = 'Profileimage1762622665882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "profileUrl" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profileUrl"`);
    }

}
