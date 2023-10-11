import { DomainError } from "./DomainError"
import { ErrorCode } from "./ErrorCode"

export class MissingRequiredFieldsError extends DomainError {
  constructor() {
    super(ErrorCode.MISSING_REQUIRED_FIELDS, "Missing required fields")
  }
}
