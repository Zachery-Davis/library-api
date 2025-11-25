import bookService from '../services/bookService.js';
import { handlePrismaError } from '../middleware/errorHandler.js';

export async function getBooks(req, res) {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json(books);
  } catch (err) {
    handlePrismaError(res, err);
  }
}

export async function getBook(req, res) {
  try {
    const book = await bookService.getBookById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json(book);
  } catch (err) {
    handlePrismaError(res, err);
  }
}

export async function createBook(req, res) {
  try {
    const created = await bookService.createBook(req.body);
    res.status(201).json(created);
  } catch (err) {
    handlePrismaError(res, err);
  }
}

export async function updateBook(req, res) {
  try {
    const updated = await bookService.updateBook(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    handlePrismaError(res, err);
  }
}

export async function deleteBook(req, res) {
  try {
    await bookService.deleteBook(req.params.id);
    res.status(204).end();
  } catch (err) {
    handlePrismaError(res, err);
  }
}
