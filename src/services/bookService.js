import bookRepo from '../repositories/bookRepo.js';

function stripBookFromRelations(book) {
  const { bookAuthors, bookGenres, checkouts, ...rest } = book;
  return {
    ...rest,
    authors: bookAuthors?.map((ba) => ba.author),
    genres: bookGenres?.map((bg) => bg.genre),
    checkouts,
  };
}

export default {
  async getAllBooks() {
    const books = await bookRepo.findAllBooks();
    return books.map(stripBookFromRelations);
  },
};
