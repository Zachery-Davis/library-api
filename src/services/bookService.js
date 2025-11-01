import * as bookRepo from '../repositories/bookRepo.js';

export async function getAllBooks() {
  return await bookRepo.findAll();
}
