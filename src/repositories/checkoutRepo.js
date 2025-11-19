import prisma from '../config/db.js';

export default {
  async createCheckout(data) {
    return prisma.checkout.create({ data });
  },
  async getCheckoutById(id) {
    return prisma.checkout.findUnique({ where: { id } });
  },
  async getAllCheckouts() {
    return prisma.checkout.findMany();
  },
  async updateCheckout(id, data) {
    return prisma.checkout.update({ where: { id }, data });
  },
  async deleteCheckout(id) {
    return prisma.checkout.delete({ where: { id } });
  },
};
