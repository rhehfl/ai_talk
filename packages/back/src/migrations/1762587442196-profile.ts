import { MigrationInterface, QueryRunner } from "typeorm";

export class Profile1762587442196 implements MigrationInterface {
    name = 'Profile1762587442196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_room" ADD "user_fk_id" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD "profileUrl" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chats" ADD "author" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chats" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "chats" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chats" ALTER COLUMN "personaId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_room" ADD CONSTRAINT "FK_d22cbbf24ecbc2e5b4c9acca9a5" FOREIGN KEY ("user_fk_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chats" ADD CONSTRAINT "FK_60105616b7efccd8c51808d777f" FOREIGN KEY ("roomId") REFERENCES "chat_room"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chats" ADD CONSTRAINT "FK_6b632a824d60d8ac75e40df3727" FOREIGN KEY ("personaId") REFERENCES "personas"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chats" DROP CONSTRAINT "FK_6b632a824d60d8ac75e40df3727"`);
        await queryRunner.query(`ALTER TABLE "chats" DROP CONSTRAINT "FK_60105616b7efccd8c51808d777f"`);
        await queryRunner.query(`ALTER TABLE "chat_room" DROP CONSTRAINT "FK_d22cbbf24ecbc2e5b4c9acca9a5"`);
        await queryRunner.query(`ALTER TABLE "chats" ALTER COLUMN "personaId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chats" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "chats" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chats" DROP COLUMN "author"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profileUrl"`);
        await queryRunner.query(`ALTER TABLE "chat_room" DROP COLUMN "user_fk_id"`);
    }

}
