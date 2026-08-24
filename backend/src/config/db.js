import mongoose from 'mongoose';

export const connectDatabase = (uri = process.env.MONGODB_URI) => mongoose.connect(uri);
