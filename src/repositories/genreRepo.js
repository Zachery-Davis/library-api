import prisma from '../config/db.js';

export default {
  async createGenre(data) {
    return prisma.genre.create({
      data,
      include: {
        bookGenres: {
          include: {
            book: {
              include: {
                bookAuthors: { include: { author: true } },
                checkouts: { include: { user: true } },
              },
            },
          },
        },
      },
    });
  },
  async getGenreById(genreId) {
    return prisma.genre.findUnique({
      where: { genreId },
      include: {
        bookGenres: {
          include: {
            book: {
              include: {
                bookAuthors: { include: { author: true } },
                checkouts: { include: { user: true } },
              },
            },
          },
        },
      },
    });
  },
  async getAllGenres() {
    return prisma.genre.findMany({
      include: {
        bookGenres: {
          include: {
            book: {
              include: {
                bookAuthors: { include: { author: true } },
                checkouts: { include: { user: true } },
              },
            },
          },
        },
      },
    });
  },
  async updateGenre(genreId, data) {
    return prisma.genre.update({
      where: { genreId },
      data,
      include: {
        bookGenres: {
          include: {
            book: {
              include: {
                bookAuthors: { include: { author: true } },
                checkouts: { include: { user: true } },
              },
            },
          },
        },
      },
    });
  },
  async deleteGenre(genreId) {
    await prisma.bookGenre.deleteMany({ where: { genreId } });
    await prisma.genre.delete({ where: { genreId } });
  },
};
