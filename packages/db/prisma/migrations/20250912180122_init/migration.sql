-- CreateEnum
CREATE TYPE "public"."titleWebhook" AS ENUM ('POST', 'GET');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Credentials" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "Credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Workflow" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "nodes" JSONB NOT NULL,
    "Connections" JSONB NOT NULL,

    CONSTRAINT "Workflow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Webhook" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "method" "public"."titleWebhook" NOT NULL,
    "path" TEXT NOT NULL,
    "header" TEXT NOT NULL,
    "secret" TEXT NOT NULL,

    CONSTRAINT "Webhook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Credentials_platform_key" ON "public"."Credentials"("platform");

-- CreateIndex
CREATE UNIQUE INDEX "Workflow_title_key" ON "public"."Workflow"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Webhook_title_key" ON "public"."Webhook"("title");
