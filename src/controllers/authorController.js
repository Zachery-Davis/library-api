import authorService from '../services/authorService.js';
import { handlePrismaError } from '../middleware/errorHandler.js';

export async function createAuthor(req, res) {
  try {
    const created = await authorService.createAuthor(req.body);
    res.status(201).json(created);
  } catch (err) {
    handlePrismaError(res, err);
  }
}

export async function getAuthors(req, res) {
  try {
    const authors = await authorService.getAllAuthors();
    res.status(200).json(authors);
  } catch (err) {
    handlePrismaError(res, err);
  }
}

export async function getAuthor(req, res) {
  try {
    const author = await authorService.getAuthorById(req.params.id);
    if (!author) return res.status(404).json({ error: 'Author not found' });
    res.status(200).json(author);
  } catch (err) {
    handlePrismaError(res, err);
  }
}

export async function updateAuthor(req, res) {
  try {
    const updated = await authorService.updateAuthor(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    handlePrismaError(res, err);
  }
}

export async function deleteAuthor(req, res) {
  try {
    await authorService.deleteAuthor(req.params.id);
    res.status(204).end();
  } catch (err) {
    handlePrismaError(res, err);
  }
}
