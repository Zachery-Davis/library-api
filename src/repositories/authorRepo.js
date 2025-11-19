import prisma from '../config/db.js';

export default {
  async createAuthor(data) {
    return prisma.author.create({ data });
  },
  async getAuthorById(id) {
    return prisma.author.findUnique({ where: { id } });
  },
  async getAllAuthors() {
    return prisma.author.findMany();
  },
  async updateAuthor(id, data) {
    return prisma.author.update({ where: { id }, data });
  },
  async deleteAuthor(id) {
    return prisma.author.delete({ where: { id } });
  },
};
