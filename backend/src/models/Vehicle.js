import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  vehicleId: { type: String, required: true, unique: true, trim: true, uppercase: true },
  make: { type: String, required: true, trim: true, index: true },
  model: { type: String, required: true, trim: true, index: true },
  category: { type: String, required: true, trim: true, index: true },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 0, validate: { validator: Number.isInteger, message: 'Quantity must be an integer' } }
}, { timestamps: true });
export default mongoose.model('Vehicle', vehicleSchema);
