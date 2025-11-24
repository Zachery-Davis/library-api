import bookRepo from '../repositories/bookRepo.js';

function stripBookFromRelations(book) {
  const { bookAuthors, bookGenres, checkouts, ...rest } = book || {};
  return {
    ...rest,
    authors: bookAuthors?.map((ba) => ba.author) ?? [],
    genres: bookGenres?.map((bg) => bg.genre) ?? [],
    checkouts: checkouts ?? [],
  };
}

export default {
  async getAllBooks() {
    const books = await bookRepo.findAllBooks();
    return books.map(stripBookFromRelations);
  },

  async getBookById(id) {
    const book = await bookRepo.findBookById(Number(id));
    return stripBookFromRelations(book);
  },

  async createBook(data) {
    const created = await bookRepo.createBook(data);
    return stripBookFromRelations(created);
  },

  async updateBook(id, data) {
    const updated = await bookRepo.updateBook(Number(id), data);
    return stripBookFromRelations(updated);
  },

  async deleteBook(id) {
    return bookRepo.removeBook(Number(id));
  },
};
