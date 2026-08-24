import Vehicle from '../models/Vehicle.js';
export async function purchase(id) {
  const vehicle = await Vehicle.findOneAndUpdate({ _id: id, quantity: { $gt: 0 } }, { $inc: { quantity: -1 } }, { new: true, runValidators: true });
  if (vehicle) return vehicle;
  if (!await Vehicle.exists({ _id: id })) throw Object.assign(new Error('Vehicle not found'), { status: 404 });
  throw Object.assign(new Error('Vehicle is out of stock'), { status: 409 });
}
export async function restock(id, quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) throw Object.assign(new Error('Restock quantity must be a positive integer'), { status: 400 });
  const vehicle = await Vehicle.findByIdAndUpdate(id, { $inc: { quantity } }, { new: true, runValidators: true });
  if (!vehicle) throw Object.assign(new Error('Vehicle not found'), { status: 404 });
  return vehicle;
}
