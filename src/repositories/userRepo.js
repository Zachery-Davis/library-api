import prisma from '../config/db.js';

export default {
  async getAllUsers() {
    return prisma.user.findMany();
  },
  async getUserById(userId) {
    return prisma.user.findUnique({ where: { userId } });
  },
  async createUser(data) {
    return prisma.user.create({ data });
  },
  async updateUser(userId, data) {
    return prisma.user.update({ where: { userId }, data });
  },
  async deleteUser(userId) {
    return prisma.user.delete({ where: { userId } });
  },
};
