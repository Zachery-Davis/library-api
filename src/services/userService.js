import userRepo from '../repositories/userRepo.js';

export default {
  async createUser(data) {
    return userRepo.createUser(data);
  },

  async getUserById(id) {
    return userRepo.getUserById(Number(id));
  },

  async getAllUsers() {
    return userRepo.getAllUsers();
  },

  async updateUser(id, data) {
    return userRepo.updateUser(Number(id), data);
  },

  async deleteUser(id) {
    return userRepo.deleteUser(Number(id));
  },
};
