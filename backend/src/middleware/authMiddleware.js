import jwt from 'jsonwebtoken';
import { fail } from '../utils/response.js';

export function authenticate(req, res, next) {
  const token = req.headers.authorization?.startsWith('Bearer ') && req.headers.authorization.slice(7);
  if (!token) return fail(res, 401, 'Authentication token is required');
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); return next(); }
  catch { return fail(res, 401, 'Invalid or expired authentication token'); }
}
export const requireAdmin = (req, res, next) => req.user?.role === 'admin' ? next() : fail(res, 403, 'Admin access is required');
