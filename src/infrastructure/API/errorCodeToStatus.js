import { ErrorCode } from "../../domain/errors/ErrorCode.js"

export const errorStatus = {
  [ErrorCode.USER_ALREADY_EXISTS]: 400,
  [ErrorCode.USER_NOT_FOUND]: 404,
  [ErrorCode.INVALID_EMAIL]: 400,
  [ErrorCode.INVALID_PASSWORD]: 400,
  [ErrorCode.MISSING_REQUIRED_FIELDS]: 400,
}

export function errorCodeToStatus(code) {
  const statusCode = errorStatus[code]
  return statusCode || 500 // Devuelve 500 (Internal Server Error) si no se encuentra el código
}
