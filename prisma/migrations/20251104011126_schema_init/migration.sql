/*
  Warnings:

  - The primary key for the `books` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `author` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `enteredAt` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `books` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `books` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `description` on the `books` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.
  - You are about to alter the column `isbn` on the `books` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - Added the required column `copies_available` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `copies_total` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `books` table without a default value. This is not possible if the table is not empty.
  - Made the column `published` on table `books` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isbn` on table `books` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('member', 'librarian');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('active', 'banned');

-- CreateEnum
CREATE TYPE "CheckOutStatus" AS ENUM ('open', 'overdue', 'closed');

-- AlterTable
ALTER TABLE "books" DROP CONSTRAINT "books_pkey",
DROP COLUMN "author",
DROP COLUMN "enteredAt",
DROP COLUMN "genre",
DROP COLUMN "id",
DROP COLUMN "updatedAt",
ADD COLUMN     "book_id" SERIAL NOT NULL,
ADD COLUMN     "copies_available" INTEGER NOT NULL,
ADD COLUMN     "copies_total" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(1000),
ALTER COLUMN "published" SET NOT NULL,
ALTER COLUMN "isbn" SET NOT NULL,
ALTER COLUMN "isbn" SET DATA TYPE VARCHAR(20),
ADD CONSTRAINT "books_pkey" PRIMARY KEY ("book_id");

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "full_name" VARCHAR(100) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'member',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'active',

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "checkouts" (
    "checkout_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "checked_out_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "due_at" TIMESTAMP(3) NOT NULL,
    "returned_at" TIMESTAMP(3),
    "status" "CheckOutStatus" NOT NULL DEFAULT 'open',

    CONSTRAINT "checkouts_pkey" PRIMARY KEY ("checkout_id")
);

-- CreateTable
CREATE TABLE "authors" (
    "author_id" SERIAL NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "bio" VARCHAR(1000),

    CONSTRAINT "authors_pkey" PRIMARY KEY ("author_id")
);

-- CreateTable
CREATE TABLE "genres" (
    "genre_id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255),

    CONSTRAINT "genres_pkey" PRIMARY KEY ("genre_id")
);

-- CreateTable
CREATE TABLE "book_authors" (
    "book_author_id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "author_id" INTEGER NOT NULL,
    "role" VARCHAR(50) NOT NULL,

    CONSTRAINT "book_authors_pkey" PRIMARY KEY ("book_author_id")
);

-- CreateTable
CREATE TABLE "book_genres" (
    "book_genre_id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "genre_id" INTEGER NOT NULL,

    CONSTRAINT "book_genres_pkey" PRIMARY KEY ("book_genre_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "checkouts_user_id_idx" ON "checkouts"("user_id");

-- CreateIndex
CREATE INDEX "checkouts_book_id_idx" ON "checkouts"("book_id");

-- CreateIndex
CREATE INDEX "authors_last_name_idx" ON "authors"("last_name");

-- CreateIndex
CREATE UNIQUE INDEX "genres_name_key" ON "genres"("name");

-- CreateIndex
CREATE INDEX "book_authors_book_id_idx" ON "book_authors"("book_id");

-- CreateIndex
CREATE INDEX "book_authors_author_id_idx" ON "book_authors"("author_id");

-- CreateIndex
CREATE UNIQUE INDEX "book_authors_book_id_author_id_role_key" ON "book_authors"("book_id", "author_id", "role");

-- CreateIndex
CREATE INDEX "book_genres_book_id_idx" ON "book_genres"("book_id");

-- CreateIndex
CREATE INDEX "book_genres_genre_id_idx" ON "book_genres"("genre_id");

-- CreateIndex
CREATE UNIQUE INDEX "book_genres_book_id_genre_id_key" ON "book_genres"("book_id", "genre_id");

-- CreateIndex
CREATE INDEX "books_isbn_idx" ON "books"("isbn");

-- AddForeignKey
ALTER TABLE "checkouts" ADD CONSTRAINT "checkouts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkouts" ADD CONSTRAINT "checkouts_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("book_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_authors" ADD CONSTRAINT "book_authors_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("book_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_authors" ADD CONSTRAINT "book_authors_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("author_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_genres" ADD CONSTRAINT "book_genres_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("book_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_genres" ADD CONSTRAINT "book_genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("genre_id") ON DELETE RESTRICT ON UPDATE CASCADE;
