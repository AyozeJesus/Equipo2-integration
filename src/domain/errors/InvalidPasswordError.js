import { DomainError } from "./DomainError.js"
import { ErrorCode } from "./ErrorCode.js"

export class InvalidPasswordError extends DomainError {
  constructor() {
    super(ErrorCode.INVALID_PASSWORD, "Invalid password")
  }
}
