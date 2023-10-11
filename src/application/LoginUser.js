export class LoginUser {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ email, password }) {
    const userByEmail = await this.userRepository.findByEmail(email)

    if (userByEmail) {
      return userByEmail.compareWith(password)
    }
  }
}
