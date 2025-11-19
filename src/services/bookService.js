import bookRepo from '../repositories/bookRepo.js';

export default {
  async getAllBooks() {
    return await bookRepo.findAllBooks();
  },
};
