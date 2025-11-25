import prisma from '../config/db.js';
import checkoutRepo from '../repositories/checkoutRepo.js';
import bookRepo from '../repositories/bookRepo.js';

export default {
  async createCheckout(data) {
    // data: { userId, bookId, dueAt, status? }
    const bookId = Number(data.bookId);

    return prisma.$transaction(async (tx) => {
      const book = await tx.book.findUnique({ where: { bookId } });
      if (!book) throw new Error('Book not found');
      if (book.copiesAvailable <= 0) throw new Error('No copies available');

      await tx.book.update({
        where: { bookId },
        data: { copiesAvailable: book.copiesAvailable - 1 },
      });

      const created = await tx.checkout.create({ data });
      return created;
    });
  },

  async returnBook(checkoutId) {
    return prisma.$transaction(async (tx) => {
      const co = await tx.checkout.findUnique({ where: { checkoutId } });
      if (!co) throw new Error('Checkout not found');
      if (co.returnedAt) throw new Error('Book already returned');

      const updated = await tx.checkout.update({
        where: { checkoutId },
        data: { returnedAt: new Date(), status: 'closed' },
      });

      await tx.book.update({
        where: { bookId: co.bookId },
        data: { copiesAvailable: { increment: 1 } },
      });

      return updated;
    });
  },

  async getCheckoutById(id) {
    return checkoutRepo.getCheckoutById(Number(id));
  },

  async getAllCheckouts() {
    return checkoutRepo.getAllCheckouts();
  },

  async updateCheckout(id, data) {
    return checkoutRepo.updateCheckout(Number(id), data);
  },

  async deleteCheckout(id) {
    await checkoutRepo.deleteCheckout(Number(id));
  },
};
