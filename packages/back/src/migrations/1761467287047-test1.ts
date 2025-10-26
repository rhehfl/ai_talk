import { MigrationInterface, QueryRunner } from "typeorm";

export class Test11761467287047 implements MigrationInterface {
    name = 'Test11761467287047'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chat_room" ("id" SERIAL NOT NULL, "user_id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "persona_id" integer NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_166431dd840c692efe5accd0f0a" UNIQUE ("user_id", "persona_id"), CONSTRAINT "PK_8aa3a52cf74c96469f0ef9fbe3e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "personas" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "prompt" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ddcb54e7bb14fced04f72e4c181" UNIQUE ("name"), CONSTRAINT "PK_714aa5d028f8f3e6645e971cecd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "chat_room" ADD CONSTRAINT "FK_28b9d70e8dde6998b9b8102c3f9" FOREIGN KEY ("persona_id") REFERENCES "personas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_room" DROP CONSTRAINT "FK_28b9d70e8dde6998b9b8102c3f9"`);
        await queryRunner.query(`DROP TABLE "personas"`);
        await queryRunner.query(`DROP TABLE "chat_room"`);
    }

}
