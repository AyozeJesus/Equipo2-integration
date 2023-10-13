import { describe, it, expect, beforeEach, beforeAll, afterAll } from "vitest"
import { UserRepositoryMongo } from "./UserRepositoryMongo.js"
import { User } from "../../domain/models/User.js"
import { UserRepositoryPostgresSQL } from "./UserRepositoryPostgresSQL.js"

describe.each([
  ["Mongo", UserRepositoryMongo],
  ["PostgresSQL", UserRepositoryPostgresSQL],
])("UserRepository%s", (name, UserRepository) => {
  describe("with a connected repository", () => {
    let userRepository

    beforeAll(async () => {
      userRepository = new UserRepository()
      await userRepository.connect()
    })

    beforeEach(async () => {
      await userRepository.reset()
    })

    afterAll(async () => {
      await userRepository.disconnect()
    })

    it("saves a user in the database", async () => {
      const id = "00000000-0000-0000-0000-000000000000"
      const name = "John Doe"
      const email = "john@email.com"
      const age = 18
      const password = "password"
      const user = User.create(id, name, email, password, age)

      await userRepository.save(user)

      const savedUser = await userRepository.findById(id)
      expect(savedUser).toEqual(user)
    })
    it("findByEmail returns the user if found", async () => {
      const id = "00000000-0000-0000-0000-000000000000"
      const name = "John Doe"
      const email = "john@email.com"
      const age = 18
      const password = "password"
      const user = User.create(id, name, email, password, age)
      await userRepository.save(user)
      await userRepository.findByEmail(email)
      expect(user.email.email).toEqual("john@email.com")

      it("findByEmail return null if user not found", async () => {
        const email = " "

        const savedUser = await userRepository.findByEmail(email)

        expect(savedUser).toEqual(null)
      })

      it("findById returns null if user not found", async () => {
        const id = "00000000-0000-0000-0000-000000000000"

        const savedUser = await userRepository.findById(id)

        expect(savedUser).toEqual(null)
      })

      it("existsByEmail returns true if user is found", async () => {
        const id = "00000000-0000-0000-0000-000000000000"
        const name = "John Doe"
        const email = "john@email.com"
        const age = 18
        const password = "password"
        const user = User.create(id, name, email, password, age)
        await userRepository.save(user)

        const existsUser = await userRepository.existsByEmail(email)

        expect(existsUser).toBe(true)
      })

      it("existsByEmail returns false if user is not found", async () => {
        const email = "john@email.com"

        const existsUser = await userRepository.existsByEmail(email)

        expect(existsUser).toBe(false)
      })
    })

    it.each([["save"], ["findById"], ["existsByEmail"], ["reset"], ["disconnect"]])(
      "throws an error on %s if not connected first",
      (method) => {
        const repository = new UserRepository()

        const result = repository[method]()

        expect(result).rejects.toThrowError("UserRepository must be connected first")
      },
    )
  })
})
