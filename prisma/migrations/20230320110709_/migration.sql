/*
  Warnings:

  - Added the required column `filename` to the `options` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "options" ADD COLUMN     "filename" TEXT NOT NULL;
