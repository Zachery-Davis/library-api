import authorService from '../services/authorService.js';

export async function createAuthor(req, res) {
  const created = await authorService.createAuthor(req.body);
  res.status(201).json(created);
}

export async function getAuthors(req, res) {
  const authors = await authorService.getAllAuthors();
  res.status(200).json(authors);
}

export async function getAuthor(req, res) {
  const author = await authorService.getAuthorById(req.params.id);
  res.status(200).json(author);
}

export async function updateAuthor(req, res) {
  const updated = await authorService.updateAuthor(req.params.id, req.body);
  res.status(200).json(updated);
}

export async function deleteAuthor(req, res) {
  const deleted = await authorService.deleteAuthor(req.params.id);
  res.status(200).json(deleted);
}
