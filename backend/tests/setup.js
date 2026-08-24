import dotenv from 'dotenv'; import { fileURLToPath } from 'url'; import { MongoMemoryServer } from 'mongodb-memory-server'; import mongoose from 'mongoose';
dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) });
let mongo;
beforeAll(async () => { process.env.JWT_SECRET = 'test-secret-that-is-long-enough'; if (process.env.TEST_MONGODB_URI) await mongoose.connect(process.env.TEST_MONGODB_URI); else { mongo = await MongoMemoryServer.create(); await mongoose.connect(mongo.getUri()); } });
afterEach(async () => { await mongoose.connection.db.dropDatabase(); });
afterAll(async () => { await mongoose.disconnect(); await mongo?.stop(); });
