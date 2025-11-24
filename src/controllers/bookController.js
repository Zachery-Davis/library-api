import bookService from '../services/bookService.js';

export async function getBooks(req, res) {
  const books = await bookService.getAllBooks();
  res.status(200).json(books);
}

export async function getBook(req, res) {
  const book = await bookService.getBookById(req.params.id);
  res.status(200).json(book);
}

export async function createBook(req, res) {
  const created = await bookService.createBook(req.body);
  res.status(201).json(created);
}

export async function updateBook(req, res) {
  const updated = await bookService.updateBook(req.params.id, req.body);
  res.status(200).json(updated);
}

export async function deleteBook(req, res) {
  const deleted = await bookService.deleteBook(req.params.id);
  res.status(200).json(deleted);
}
