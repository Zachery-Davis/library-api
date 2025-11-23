import prisma from '../config/db.js';

export default {
  async findAllBooks() {
    return await prisma.book.findMany({
      include: {
        bookAuthors: { include: { author: true } },
        bookGenres: { include: { genre: true } },
        checkouts: true,
      },
    });
  },
  async findBookById(bookId) {
    return await prisma.book.findUnique({
      where: { bookId },
      include: {
        bookAuthors: { include: { author: true } },
        bookGenres: { include: { genre: true } },
        checkouts: true,
      },
    });
  },
  async createBook(data) {
    return await prisma.book.create({ data });
  },
  async updateBook(bookId, data) {
    return await prisma.book.update({ where: { bookId }, data });
  },
  async removeBook(bookId) {
    return await prisma.book.delete({ where: { bookId } });
  },
};
