import bookRepo from '../repositories/bookRepo.js';

function stripBookFromRelations(book) {
  if (!book) return null;
  const { bookAuthors, bookGenres, checkouts, ...rest } = book;
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
    const { authors, genres, ...bookData } = data;

    const createData = {
      ...bookData,
      bookAuthors: authors
        ? {
            create: authors.map((a) =>
              typeof a === 'object'
                ? { authorId: a.authorId, role: a.role || 'Author' }
                : { authorId: a, role: 'Author' },
            ),
          }
        : undefined,
      bookGenres: genres
        ? {
            create: genres.map((g) =>
              typeof g === 'object' ? { genreId: g.genreId } : { genreId: g },
            ),
          }
        : undefined,
    };

    const created = await bookRepo.createBook(createData);
    return stripBookFromRelations(created);
  },

  async updateBook(id, data) {
    const { authors, genres, ...bookData } = data;

    const updateData = {
      ...bookData,
      bookAuthors: authors
        ? {
            deleteMany: {},
            create: authors.map((a) =>
              typeof a === 'object'
                ? { authorId: a.authorId, role: a.role || 'Author' }
                : { authorId: a, role: 'Author' },
            ),
          }
        : undefined,
      bookGenres: genres
        ? {
            deleteMany: {},
            create: genres.map((g) =>
              typeof g === 'object' ? { genreId: g.genreId } : { genreId: g },
            ),
          }
        : undefined,
    };

    const updated = await bookRepo.updateBook(Number(id), updateData);
    return stripBookFromRelations(updated);
  },

  async deleteBook(id) {
    await bookRepo.removeBook(Number(id));
  },
};
