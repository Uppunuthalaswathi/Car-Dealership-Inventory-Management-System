import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export const issueToken = (user) => jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '8h' });
export async function register({ name, email, password }) {
  if (!name || !email || !password || password.length < 8) throw Object.assign(new Error('Name, valid email, and a password of at least 8 characters are required'), { status: 400 });
  if (await User.exists({ email: email.toLowerCase() })) throw Object.assign(new Error('Email is already registered'), { status: 409 });
  return User.create({ name, email, password });
}
export async function login({ email, password }) {
  if (!email || !password) throw Object.assign(new Error('Email and password are required'), { status: 400 });
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user || !(await user.comparePassword(password))) throw Object.assign(new Error('Invalid email or password'), { status: 401 });
  return user;
}
