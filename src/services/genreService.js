import genreRepo from '../repositories/genreRepo.js';

export default {
  async createGenre(data) {
    return genreRepo.createGenre(data);
  },

  async getGenreById(id) {
    return genreRepo.getGenreById(Number(id));
  },

  async getAllGenres() {
    return genreRepo.getAllGenres();
  },

  async updateGenre(id, data) {
    return genreRepo.updateGenre(Number(id), data);
  },

  async deleteGenre(id) {
    return genreRepo.deleteGenre(Number(id));
  },
};
