import { JWTGenerator } from "../../domain/services/JWTGenerator"

export class JWTGeneratorMock extends JWTGenerator {
  generate(userID) {
    return "valid_token"
  }
}
