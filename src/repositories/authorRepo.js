import prisma from '../config/db.js';

export default {
  async createAuthor(data) {
    return prisma.author.create({ data });
  },
  async getAuthorById(authorId) {
    return prisma.author.findUnique({ where: { authorId } });
  },
  async getAllAuthors() {
    return prisma.author.findMany();
  },
  async updateAuthor(authorId, data) {
    return prisma.author.update({ where: { authorId }, data });
  },
  async deleteAuthor(authorId) {
    return prisma.author.delete({ where: { authorId } });
  },
};
