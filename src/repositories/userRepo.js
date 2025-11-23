import prisma from '../config/db.js';

export default {
  async getAllUsers() {
    return prisma.user.findMany({
      include: {
        checkouts: {
          include: {
            book: {
              include: {
                bookAuthors: { include: { author: true } },
                bookGenres: { include: { genre: true } },
              },
            },
          },
        },
      },
    });
  },
  async getUserById(userId) {
    return prisma.user.findUnique({
      where: { userId },
      include: {
        checkouts: {
          include: {
            book: {
              include: {
                bookAuthors: { include: { author: true } },
                bookGenres: { include: { genre: true } },
              },
            },
          },
        },
      },
    });
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
