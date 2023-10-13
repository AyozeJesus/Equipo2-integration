import { InvalidPasswordError } from "../domain/errors/InvalidPasswordError.js"
import { UserNotFoundError } from "../domain/errors/UserNotFoundError.js"
export class LoginUser {
  constructor(userRepository, jwtGenerator) {
    this.userRepository = userRepository
    this.jwtGenerator = jwtGenerator
  }

  async execute(email, password) {
    const user = await this.userRepository.findByEmail(email)
    console.log(user, "user")
    console.log(password, "password")
    if (!user) {
      throw new UserNotFoundError()
    }
    if (!user.hasPassword(password)) {
      throw new InvalidPasswordError()
    }

    return this.jwtGenerator.generate()
  }
}
