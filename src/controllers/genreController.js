import genreService from '../services/genreService.js';

export async function createGenre(req, res) {
  const created = await genreService.createGenre(req.body);
  res.status(201).json(created);
}

export async function getGenres(req, res) {
  const genres = await genreService.getAllGenres();
  res.status(200).json(genres);
}

export async function getGenre(req, res) {
  const genre = await genreService.getGenreById(req.params.id);
  res.status(200).json(genre);
}

export async function updateGenre(req, res) {
  const updated = await genreService.updateGenre(req.params.id, req.body);
  res.status(200).json(updated);
}

export async function deleteGenre(req, res) {
  const deleted = await genreService.deleteGenre(req.params.id);
  res.status(200).json(deleted);
}

