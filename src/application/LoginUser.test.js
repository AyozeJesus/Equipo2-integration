import { describe, it, expect, beforeEach, vi } from "vitest"
import { UserRepositoryMock } from "../infrastructure/UserRepository/UserRepositoryMock.js"
import { User } from "../domain/models/User.js"
import { LoginUser } from "./LoginUser.js"
import { JWTGeneratorMock } from "../infrastructure/JWTGenerator/JWTGeneratorMock.js"
import { IdGeneratorMock } from "../infrastructure/IdGenerator/IdGeneratorMock.js"
import { UserNotFoundError } from "../domain/errors/UserNotFoundError.js"
import { InvalidPasswordError } from "../domain/errors/InvalidPasswordError.js"

describe("LoginUser", () => {
  let userRepository
  let loginUser
  let jwtGenerator
  const testToken = "token"
  const testEmail = "john@email.com"
  const testPassword = "password"

  beforeEach(() => {
    userRepository = new UserRepositoryMock()
    jwtGenerator = new JWTGeneratorMock()
    loginUser = new LoginUser(userRepository, jwtGenerator)
  })

  it("returns the token when the login its succesfull", async () => {
    const name = "John Doe"
    const email = "john@email.com"
    const age = 18
    const password = "password"
    const user = User.create(IdGeneratorMock.MOCK_ID, name, email, password, age)
    vi.spyOn(userRepository, "findByEmail").mockReturnValue(user)
    vi.spyOn(jwtGenerator, "generate").mockReturnValue(testToken)

    const token = await loginUser.execute(testEmail, testPassword)

    expect(token).toBe(testToken)
  })

  it("finds the user in the repository by email", async () => {
    const name = "John Doe"
    const email = "john@email.com"
    const age = 18
    const password = "password"
    const user = User.create(IdGeneratorMock.MOCK_ID, name, email, password, age)
    vi.spyOn(userRepository, "findByEmail").mockReturnValue(user)
    vi.spyOn(jwtGenerator, "generate").mockReturnValue(testToken)

    await loginUser.execute(testEmail, testPassword)

    expect(userRepository.findByEmail).toHaveBeenCalledWith(email)
  })

  it("throws an error when the user does not exist", async () => {
    vi.spyOn(userRepository, "findByEmail").mockReturnValue(null)

    const result = loginUser.execute(testEmail, testPassword)

    await expect(result).rejects.toBeInstanceOf(UserNotFoundError)
  })

  it("throws an error when the password is incorrect", async () => {
    const name = "John Doe"
    const age = 18
    const user = User.create(IdGeneratorMock.MOCK_ID, name, testEmail, testPassword, age)
    vi.spyOn(userRepository, "findByEmail").mockReturnValue(user)

    const result = loginUser.execute(testEmail, "incorrectPassword")

    await expect(result).rejects.toBeInstanceOf(InvalidPasswordError)
  })
})
