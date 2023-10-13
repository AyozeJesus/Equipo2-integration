import { InvalidPasswordError } from "../domain/errors/InvalidPasswordError.js"
import { UserNotFoundError } from "../domain/errors/UserNotFoundError.js"
export class LoginUser {
  constructor(userRepository, jwtGenerator) {
    this.userRepository = userRepository
    this.jwtGenerator = jwtGenerator
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new UserNotFoundError()
    }
    if (user.compareWith(password)) {
      throw new InvalidPasswordError()
    }

    return this.jwtGenerator.generate()
  }
}
