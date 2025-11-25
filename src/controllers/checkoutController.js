import checkoutService from '../services/checkoutService.js';
import { handlePrismaError } from '../middleware/errorHandler.js';

export async function createCheckout(req, res) {
  try {
    const created = await checkoutService.createCheckout(req.body);
    res.status(201).json(created);
  } catch (err) {
    handlePrismaError(res, err);
  }
}

export async function returnCheckout(req, res) {
  try {
    const updated = await checkoutService.returnBook(Number(req.params.id));
    res.status(200).json(updated);
  } catch (err) {
    handlePrismaError(res, err);
  }
}

export async function getCheckouts(req, res) {
  try {
    const list = await checkoutService.getAllCheckouts();
    res.status(200).json(list);
  } catch (err) {
    handlePrismaError(res, err);
  }
}

export async function getCheckout(req, res) {
  try {
    const co = await checkoutService.getCheckoutById(req.params.id);
    if (!co) return res.status(404).json({ error: 'Checkout not found' });
    res.status(200).json(co);
  } catch (err) {
    handlePrismaError(res, err);
  }
}

export async function updateCheckout(req, res) {
  try {
    const updated = await checkoutService.updateCheckout(
      req.params.id,
      req.body,
    );
    res.status(200).json(updated);
  } catch (err) {
    handlePrismaError(res, err);
  }
}

export async function deleteCheckout(req, res) {
  try {
    await checkoutService.deleteCheckout(req.params.id);
    res.status(204).end();
  } catch (err) {
    handlePrismaError(res, err);
  }
}
