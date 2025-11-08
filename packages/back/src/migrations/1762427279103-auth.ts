import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auth1762427279103 implements MigrationInterface {
  name = 'Auth1762427279103';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_provider_enum" AS ENUM('local', 'kakao', 'google')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying, "password" character varying, "nickname" character varying NOT NULL, "provider" "public"."user_provider_enum" NOT NULL DEFAULT 'local', "providerId" character varying, CONSTRAINT "UQ_360717bb2dcd77e2d9e4e6e5259" UNIQUE ("email", "provider"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "chat_room" ("id" SERIAL NOT NULL, "user_id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "persona_id" integer NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_fk_id" uuid, CONSTRAINT "UQ_166431dd840c692efe5accd0f0a" UNIQUE ("user_id", "persona_id"), CONSTRAINT "PK_8aa3a52cf74c96469f0ef9fbe3e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "personas" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "prompt" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ddcb54e7bb14fced04f72e4c181" UNIQUE ("name"), CONSTRAINT "PK_714aa5d028f8f3e6645e971cecd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "chats" ("id" SERIAL NOT NULL, "roomId" integer NOT NULL, "userId" character varying NOT NULL, "personaId" integer, "author" character varying NOT NULL, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0117647b3c4a4e5ff198aeb6206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat_room" ADD CONSTRAINT "FK_d22cbbf24ecbc2e5b4c9acca9a5" FOREIGN KEY ("user_fk_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat_room" ADD CONSTRAINT "FK_28b9d70e8dde6998b9b8102c3f9" FOREIGN KEY ("persona_id") REFERENCES "personas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "chats" ADD CONSTRAINT "FK_60105616b7efccd8c51808d777f" FOREIGN KEY ("roomId") REFERENCES "chat_room"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "chats" ADD CONSTRAINT "FK_6b632a824d60d8ac75e40df3727" FOREIGN KEY ("personaId") REFERENCES "personas"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chats" DROP CONSTRAINT "FK_6b632a824d60d8ac75e40df3727"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chats" DROP CONSTRAINT "FK_60105616b7efccd8c51808d777f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat_room" DROP CONSTRAINT "FK_28b9d70e8dde6998b9b8102c3f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat_room" DROP CONSTRAINT "FK_d22cbbf24ecbc2e5b4c9acca9a5"`,
    );
    await queryRunner.query(`DROP TABLE "chats"`);
    await queryRunner.query(`DROP TABLE "personas"`);
    await queryRunner.query(`DROP TABLE "chat_room"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_provider_enum"`);
  }
}
