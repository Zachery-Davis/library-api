import * as bookService from '../services/bookService.js';

export async function getBooks(req, res) {
  const books = await bookService.getAllBooks();
  res.status(200).json(books);
}
