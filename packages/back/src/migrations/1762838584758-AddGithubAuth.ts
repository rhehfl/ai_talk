import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGithubAuth1762838584758 implements MigrationInterface {
    name = 'AddGithubAuth1762838584758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "githubAccessToken" character varying`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_360717bb2dcd77e2d9e4e6e5259"`);
        await queryRunner.query(`ALTER TYPE "public"."user_provider_enum" RENAME TO "user_provider_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_provider_enum" AS ENUM('local', 'kakao', 'google', 'github')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "provider" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "provider" TYPE "public"."user_provider_enum" USING "provider"::"text"::"public"."user_provider_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "provider" SET DEFAULT 'local'`);
        await queryRunner.query(`DROP TYPE "public"."user_provider_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_360717bb2dcd77e2d9e4e6e5259" UNIQUE ("email", "provider")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_360717bb2dcd77e2d9e4e6e5259"`);
        await queryRunner.query(`CREATE TYPE "public"."user_provider_enum_old" AS ENUM('local', 'kakao', 'google')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "provider" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "provider" TYPE "public"."user_provider_enum_old" USING "provider"::"text"::"public"."user_provider_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "provider" SET DEFAULT 'local'`);
        await queryRunner.query(`DROP TYPE "public"."user_provider_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_provider_enum_old" RENAME TO "user_provider_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_360717bb2dcd77e2d9e4e6e5259" UNIQUE ("email", "provider")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "githubAccessToken"`);
    }

}
