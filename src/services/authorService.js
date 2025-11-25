import authorRepo from '../repositories/authorRepo.js';

export default {
  async createAuthor(data) {
    return authorRepo.createAuthor(data);
  },

  async getAuthorById(id) {
    return authorRepo.getAuthorById(Number(id));
  },

  async getAllAuthors() {
    return authorRepo.getAllAuthors();
  },

  async updateAuthor(id, data) {
    return authorRepo.updateAuthor(Number(id), data);
  },

  async deleteAuthor(id) {
    await authorRepo.deleteAuthor(Number(id));
  },
};
