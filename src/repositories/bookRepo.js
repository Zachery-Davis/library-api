import prisma from '../config/db.js';

export default {
  async findAllBooks() {
    return await prisma.book.findMany();
  },
  async findBookById(id) {
    return await prisma.book.findUnique({ where: { id } });
  },
  async createBook(data) {
    return await prisma.book.create({ data });
  },
  async updateBook(id, data) {
    return await prisma.book.update({ where: { id }, data });
  },
  async removeBook(id) {
    return await prisma.book.delete({ where: { id } });
  },
};
