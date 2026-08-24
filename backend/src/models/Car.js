import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  make: { type: String, required: true, trim: true, index: true },
  model: { type: String, required: true, trim: true, index: true },
  year: { type: Number, required: true, min: 1886, max: new Date().getFullYear() + 1 },
  price: { type: Number, required: true, min: 0 },
  mileage: { type: Number, required: true, min: 0 },
  fuelType: { type: String, required: true, enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'], index: true },
  transmission: { type: String, required: true, enum: ['Manual', 'Automatic'], index: true },
  color: { type: String, required: true, trim: true },
  condition: { type: String, required: true, enum: ['New', 'Used'], index: true },
  status: { type: String, required: true, enum: ['Available', 'Sold'], default: 'Available', index: true },
  description: { type: String, trim: true, maxlength: 2000, default: '' },
  image: { type: String, trim: true, default: '' }
}, { timestamps: true });

export default mongoose.model('Car', carSchema);
