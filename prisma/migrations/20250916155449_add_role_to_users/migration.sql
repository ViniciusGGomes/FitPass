-- CreateEnum
CREATE TYPE "public"."ROLE" AS ENUM ('ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "role" "public"."ROLE" NOT NULL DEFAULT 'MEMBER';
