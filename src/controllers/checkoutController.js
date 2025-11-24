import checkoutService from '../services/checkoutService.js';

export async function createCheckout(req, res) {
  const created = await checkoutService.createCheckout(req.body);
  res.status(201).json(created);
}

export async function returnCheckout(req, res) {
  const updated = await checkoutService.returnBook(Number(req.params.id));
  res.status(200).json(updated);
}

export async function getCheckouts(req, res) {
  const list = await checkoutService.getAllCheckouts();
  res.status(200).json(list);
}

export async function getCheckout(req, res) {
  const co = await checkoutService.getCheckoutById(req.params.id);
  res.status(200).json(co);
}

export async function updateCheckout(req, res) {
  const updated = await checkoutService.updateCheckout(req.params.id, req.body);
  res.status(200).json(updated);
}

export async function deleteCheckout(req, res) {
  const deleted = await checkoutService.deleteCheckout(req.params.id);
  res.status(200).json(deleted);
}

