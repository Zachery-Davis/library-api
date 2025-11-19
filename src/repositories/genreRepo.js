import prisma from '../config/db.js';

export default {
  async createGenre(data) {
    return prisma.genre.create({ data });
  },
  async getGenreById(id) {
    return prisma.genre.findUnique({ where: { id } });
  },
  async getAllGenres() {
    return prisma.genre.findMany();
  },
  async updateGenre(id, data) {
    return prisma.genre.update({ where: { id }, data });
  },
  async deleteGenre(id) {
    return prisma.genre.delete({ where: { id } });
  },
};
