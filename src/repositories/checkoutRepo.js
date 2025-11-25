import prisma from '../config/db.js';

export default {
  async createCheckout(data) {
    return prisma.checkout.create({
      data,
      include: {
        user: true,
        book: {
          include: {
            bookAuthors: { include: { author: true } },
            bookGenres: { include: { genre: true } },
          },
        },
      },
    });
  },
  async getCheckoutById(checkoutId) {
    return prisma.checkout.findUnique({
      where: { checkoutId },
      include: {
        user: true,
        book: {
          include: {
            bookAuthors: { include: { author: true } },
            bookGenres: { include: { genre: true } },
          },
        },
      },
    });
  },
  async getAllCheckouts() {
    return prisma.checkout.findMany({
      include: {
        user: true,
        book: {
          include: {
            bookAuthors: { include: { author: true } },
            bookGenres: { include: { genre: true } },
          },
        },
      },
    });
  },
  async updateCheckout(checkoutId, data) {
    return prisma.checkout.update({
      where: { checkoutId },
      data,
      include: {
        user: true,
        book: {
          include: {
            bookAuthors: { include: { author: true } },
            bookGenres: { include: { genre: true } },
          },
        },
      },
    });
  },
  async deleteCheckout(checkoutId) {
    await prisma.checkout.delete({ where: { checkoutId } });
  },
};
