import { login, register, issueToken } from '../services/authService.js';
import { ok, fail } from '../utils/response.js';
import User from '../models/User.js';
export async function registerUser(req, res, next) { try { const user = await register(req.body); ok(res, 201, 'Registration successful', { user: user.toSafeObject() }); } catch (e) { e.status ? fail(res, e.status, e.message) : next(e); } }
export async function loginUser(req, res, next) { try { const user = await login(req.body); ok(res, 200, 'Login successful', { token: issueToken(user), user: user.toSafeObject() }); } catch (e) { e.status ? fail(res, e.status, e.message) : next(e); } }
export async function currentUser(req, res, next) { try { const user = await User.findById(req.user.id); if (!user) return fail(res, 404, 'User not found'); return ok(res, 200, 'Current user retrieved', { user: user.toSafeObject() }); } catch (e) { return next(e); } }
