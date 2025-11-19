import prisma from '../config/db.js';

export default {
  async getAllUsers() {
    return prisma.user.findMany();
  },
  async getUserById(id) {
    return prisma.user.findUnique({ where: { id } });
  },
  async createUser(data) {
    return prisma.user.create({ data });
  },
  async updateUser(id, data) {
    return prisma.user.update({ where: { id }, data });
  },
  async deleteUser(id) {
    return prisma.user.delete({ where: { id } });
  },
};
