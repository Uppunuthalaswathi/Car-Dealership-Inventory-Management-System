export const ok = (res, status, message, data = {}) => res.status(status).json({ success: true, message, data });
export const fail = (res, status, message, error = message) => res.status(status).json({ success: false, message, error });
