import prisma from '../config/db.js';

export default {
  async createGenre(data) {
    return prisma.genre.create({ data });
  },
  async getGenreById(genreId) {
    return prisma.genre.findUnique({ where: { genreId } });
  },
  async getAllGenres() {
    return prisma.genre.findMany();
  },
  async updateGenre(genreId, data) {
    return prisma.genre.update({ where: { genreId }, data });
  },
  async deleteGenre(genreId) {
    return prisma.genre.delete({ where: { genreId } });
  },
};
