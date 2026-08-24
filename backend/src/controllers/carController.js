import Car from '../models/Car.js';
import { fail, ok } from '../utils/response.js';

const sortFields = { price_asc: { price: 1 }, price_desc: { price: -1 }, year_desc: { year: -1 }, year_asc: { year: 1 }, mileage_asc: { mileage: 1 }, mileage_desc: { mileage: -1 } };
const numberFilter = (value, operator) => value === undefined || value === '' ? undefined : { [operator]: Number(value) };
const wrap = (action) => async (req, res, next) => { try { await action(req, res); } catch (error) { next(error); } };

export const listCars = wrap(async (req, res) => {
  const { search, make, fuelType, transmission, condition, status, minPrice, maxPrice, minYear, maxYear, minMileage, maxMileage, sort } = req.query;
  const filter = {};
  if (search) filter.$or = ['make', 'model', 'color'].map((field) => ({ [field]: { $regex: search, $options: 'i' } }));
  for (const [field, value] of Object.entries({ make, fuelType, transmission, condition, status })) if (value && value !== 'All') filter[field] = field === 'make' ? { $regex: value, $options: 'i' } : value;
  for (const [field, lower, upper] of [['price', minPrice, maxPrice], ['year', minYear, maxYear], ['mileage', minMileage, maxMileage]]) { const range = { ...numberFilter(lower, '$gte'), ...numberFilter(upper, '$lte') }; if (Object.keys(range).length) filter[field] = range; }
  const cars = await Car.find(filter).sort(sortFields[sort] || { createdAt: -1 });
  ok(res, 200, 'Cars retrieved successfully', { cars });
});
export const getCar = wrap(async (req, res) => { const car = await Car.findById(req.params.id); if (!car) return fail(res, 404, 'Car not found'); ok(res, 200, 'Car retrieved successfully', { car }); });
export const createCar = wrap(async (req, res) => { const car = await Car.create(req.body); ok(res, 201, 'Car created successfully', { car }); });
export const updateCar = wrap(async (req, res) => { const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); if (!car) return fail(res, 404, 'Car not found'); ok(res, 200, 'Car updated successfully', { car }); });
export const deleteCar = wrap(async (req, res) => { const car = await Car.findByIdAndDelete(req.params.id); if (!car) return fail(res, 404, 'Car not found'); ok(res, 200, 'Car deleted successfully'); });
export const carStats = wrap(async (req, res) => { const [summary] = await Car.aggregate([{ $group: { _id: null, totalCars: { $sum: 1 }, availableCars: { $sum: { $cond: [{ $eq: ['$status', 'Available'] }, 1, 0] } }, soldCars: { $sum: { $cond: [{ $eq: ['$status', 'Sold'] }, 1, 0] } }, inventoryValue: { $sum: '$price' } } }]); ok(res, 200, 'Car statistics retrieved', { statistics: summary ? { totalCars: summary.totalCars, availableCars: summary.availableCars, soldCars: summary.soldCars, inventoryValue: summary.inventoryValue } : { totalCars: 0, availableCars: 0, soldCars: 0, inventoryValue: 0 } }); });
