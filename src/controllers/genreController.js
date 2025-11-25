import genreService from '../services/genreService.js';
import { handlePrismaError } from '../middleware/errorHandler.js';

export async function createGenre(req, res) {
  try {
    const created = await genreService.createGenre(req.body);
    res.status(201).json(created);
  } catch (err) {
    handlePrismaError(res, err);
  }
}

export async function getGenres(req, res) {
  try {
    const genres = await genreService.getAllGenres();
    res.status(200).json(genres);
  } catch (err) {
    handlePrismaError(res, err);
  }
}

export async function getGenre(req, res) {
  try {
    const genre = await genreService.getGenreById(req.params.id);
    if (!genre) return res.status(404).json({ error: 'Genre not found' });
    res.status(200).json(genre);
  } catch (err) {
    handlePrismaError(res, err);
  }
}

export async function updateGenre(req, res) {
  try {
    const updated = await genreService.updateGenre(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    handlePrismaError(res, err);
  }
}

export async function deleteGenre(req, res) {
  try {
    await genreService.deleteGenre(req.params.id);
    res.status(204).end();
  } catch (err) {
    handlePrismaError(res, err);
  }
}
