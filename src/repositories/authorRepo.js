import prisma from '../config/db.js';

export default {
  async createAuthor(data) {
    return prisma.author.create({ data });
  },
  async getAuthorById(authorId) {
    return prisma.author.findUnique({
      where: { authorId },
      include: {
        bookAuthors: {
          include: {
            book: {
              include: {
                bookGenres: { include: { genre: true } },
                bookAuthors: { include: { author: true } },
                checkouts: { include: { user: true } },
              },
            },
          },
        },
      },
    });
  },
  async getAllAuthors() {
    return prisma.author.findMany({
      include: {
        bookAuthors: {
          include: {
            book: {
              include: {
                bookGenres: { include: { genre: true } },
                bookAuthors: { include: { author: true } },
                checkouts: { include: { user: true } },
              },
            },
          },
        },
      },
    });
  },
  async updateAuthor(authorId, data) {
    return prisma.author.update({ where: { authorId }, data });
  },
  async deleteAuthor(authorId) {
    return prisma.author.delete({ where: { authorId } });
  },
};
