import prisma from '../config/db.js';

export default {
  async getAllUsers() {
    return prisma.user.findMany({
      omit: { password: true },
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
      omit: { password: true },
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
    return prisma.user.create({
      data,
      omit: { password: true },
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
  async updateUser(userId, data) {
    return prisma.user.update({
      where: { userId },
      data,
      omit: { password: true },
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
  async deleteUser(userId) {
    await prisma.checkout.deleteMany({ where: { userId } });
    await prisma.user.delete({ where: { userId } });
  },
};
