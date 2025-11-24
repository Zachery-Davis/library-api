import userService from '../services/userService.js';

export async function createUser(req, res) {
  const created = await userService.createUser(req.body);
  res.status(201).json(created);
}

export async function getUsers(req, res) {
  const users = await userService.getAllUsers();
  res.status(200).json(users);
}

export async function getUser(req, res) {
  const user = await userService.getUserById(req.params.id);
  res.status(200).json(user);
}

export async function updateUser(req, res) {
  const updated = await userService.updateUser(req.params.id, req.body);
  res.status(200).json(updated);
}

export async function deleteUser(req, res) {
  const deleted = await userService.deleteUser(req.params.id);
  res.status(200).json(deleted);
}
