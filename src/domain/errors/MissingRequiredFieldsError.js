import { DomainError } from "./DomainError.js"
import { ErrorCode } from "./ErrorCode.js"

export class MissingRequiredFieldsError extends DomainError {
  constructor() {
    super(ErrorCode.MISSING_REQUIRED_FIELDS, "Missing required fields")
  }
}
