import { errorCodeToStatus } from "./errorCodeToStatus.js"
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const statusCode = errorCodeToStatus(err.code)
  res.status(statusCode).json({ code: err.code, error: err.message })
}
