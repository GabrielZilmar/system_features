import { MigrationInterface, QueryRunner } from 'typeorm';

export class Inital1785784670748 implements MigrationInterface {
  name = 'Inital1785784670748';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "user_id" integer, CONSTRAINT "REL_16aac8a9f6f9c1dd6bcb75ec02" UNIQUE ("user_id"), CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf" UNIQUE ("name"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "system_feature_groups" ("id" SERIAL NOT NULL, "key" character varying(255) NOT NULL, CONSTRAINT "UQ_b0765adc49ccdf8116908ca366f" UNIQUE ("key"), CONSTRAINT "PK_5fe53045d96a136b72ee147324c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "system_feature_group_permissions" ("group_id" integer NOT NULL, "feature_id" integer NOT NULL, "is_allowed" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_e92b8f8d1e8509a940c2b8e941d" PRIMARY KEY ("group_id", "feature_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "system_features" ("id" SERIAL NOT NULL, "key" character varying(100) NOT NULL, "display_name" character varying(255), "description" character varying, "is_enabled" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_3927db26bc678c49b9a2b47c28c" UNIQUE ("key"), CONSTRAINT "PK_0c1d7826eeafb79aca18282059b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "system_feature_group_rule_sets" ("id" SERIAL NOT NULL, "group_id" integer NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "UQ_d7230ff037134617be5ea4bf0fd" UNIQUE ("group_id", "name"), CONSTRAINT "PK_3db720b086c4240bcf42f63fb41" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."system_feature_group_rules_operator_enum" AS ENUM('IN', 'NOT_IN')`,
    );
    await queryRunner.query(
      `CREATE TABLE "system_feature_group_rules" ("id" SERIAL NOT NULL, "rule_set_id" integer NOT NULL, "field" character varying(255) NOT NULL, "comparison_values" text NOT NULL, "operator" "public"."system_feature_group_rules_operator_enum" NOT NULL, CONSTRAINT "PK_72165a51e767bb4ebfcdf89868b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "system_feature_group_members" ("group_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_1fc09c7840cca782c269c39ca0e" PRIMARY KEY ("group_id", "user_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "addresses" ADD CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "system_feature_group_permissions" ADD CONSTRAINT "FK_999c029061b6e7961cc772b5f70" FOREIGN KEY ("group_id") REFERENCES "system_feature_groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "system_feature_group_permissions" ADD CONSTRAINT "FK_5e5ab79733772a2652bd93ef886" FOREIGN KEY ("feature_id") REFERENCES "system_features"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "system_feature_group_rule_sets" ADD CONSTRAINT "FK_90b2557ecca6c3cabaaafe915d0" FOREIGN KEY ("group_id") REFERENCES "system_feature_groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "system_feature_group_rules" ADD CONSTRAINT "FK_f7dd24e777243c5589c4d07a66c" FOREIGN KEY ("rule_set_id") REFERENCES "system_feature_group_rule_sets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "system_feature_group_members" ADD CONSTRAINT "FK_65d8bc89df15c771d45fd4bbdef" FOREIGN KEY ("group_id") REFERENCES "system_feature_groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "system_feature_group_members" ADD CONSTRAINT "FK_7bebabae5382be76c1a24e6e3ce" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "system_feature_group_members" DROP CONSTRAINT "FK_7bebabae5382be76c1a24e6e3ce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "system_feature_group_members" DROP CONSTRAINT "FK_65d8bc89df15c771d45fd4bbdef"`,
    );
    await queryRunner.query(
      `ALTER TABLE "system_feature_group_rules" DROP CONSTRAINT "FK_f7dd24e777243c5589c4d07a66c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "system_feature_group_rule_sets" DROP CONSTRAINT "FK_90b2557ecca6c3cabaaafe915d0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "system_feature_group_permissions" DROP CONSTRAINT "FK_5e5ab79733772a2652bd93ef886"`,
    );
    await queryRunner.query(
      `ALTER TABLE "system_feature_group_permissions" DROP CONSTRAINT "FK_999c029061b6e7961cc772b5f70"`,
    );
    await queryRunner.query(
      `ALTER TABLE "addresses" DROP CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023"`,
    );
    await queryRunner.query(`DROP TABLE "system_feature_group_members"`);
    await queryRunner.query(`DROP TABLE "system_feature_group_rules"`);
    await queryRunner.query(
      `DROP TYPE "public"."system_feature_group_rules_operator_enum"`,
    );
    await queryRunner.query(`DROP TABLE "system_feature_group_rule_sets"`);
    await queryRunner.query(`DROP TABLE "system_features"`);
    await queryRunner.query(`DROP TABLE "system_feature_group_permissions"`);
    await queryRunner.query(`DROP TABLE "system_feature_groups"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "addresses"`);
  }
}
