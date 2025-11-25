import prisma from '../config/db.js';

export default {
  async findAllBooks() {
    return await prisma.book.findMany({
      include: {
        bookAuthors: { include: { author: true } },
        bookGenres: { include: { genre: true } },
        checkouts: { include: { user: true } },
      },
    });
  },
  async findBookById(bookId) {
    return await prisma.book.findUnique({
      where: { bookId },
      include: {
        bookAuthors: { include: { author: true } },
        bookGenres: { include: { genre: true } },
        checkouts: { include: { user: true } },
      },
    });
  },
  async createBook(data) {
    return await prisma.book.create({
      data,
      include: {
        bookAuthors: { include: { author: true } },
        bookGenres: { include: { genre: true } },
        checkouts: { include: { user: true } },
      },
    });
  },
  async updateBook(bookId, data) {
    return await prisma.book.update({
      where: { bookId },
      data,
      include: {
        bookAuthors: { include: { author: true } },
        bookGenres: { include: { genre: true } },
        checkouts: { include: { user: true } },
      },
    });
  },
  async removeBook(bookId) {
    await prisma.bookAuthor.deleteMany({ where: { bookId } });
    await prisma.bookGenre.deleteMany({ where: { bookId } });
    await prisma.checkout.deleteMany({ where: { bookId } });
    await prisma.book.delete({ where: { bookId } });
  },
};
