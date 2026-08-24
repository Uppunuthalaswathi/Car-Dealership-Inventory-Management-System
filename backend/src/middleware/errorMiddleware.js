import { fail } from '../utils/response.js';
export function notFound(req, res) { fail(res, 404, `Route ${req.method} ${req.originalUrl} was not found`); }
export function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  if (err?.code === 11000) return fail(res, 409, 'A record with that unique value already exists');
  if (err?.name === 'CastError') return fail(res, 400, 'Invalid resource ID');
  if (err?.name === 'ValidationError') return fail(res, 400, 'Validation failed', Object.values(err.errors).map(({ message }) => message).join(', '));
  console.error(err);
  return fail(res, 500, 'An unexpected server error occurred');
}
