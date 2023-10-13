import { UserRepository } from "../../domain/repository/UserRepository.js"
import { User } from "../../domain/models/User.js"
import { UserPassword } from "../../domain/models/UserPassword.js"
import { postgresClient } from "./PostgresClient.js"

export class UserRepositoryPostgresSQL extends UserRepository {
  constructor() {
    super()
    this.client = postgresClient
    this.connected = false
  }

  async save(user) {
    this.ensureIsConnected()
    await this.client.query(`INSERT INTO users VALUES ($1, $2, $3, $4, $5)`, [
      user.id,
      user.name,
      user.email.email,
      user.password.password,
      user.age.age,
    ])
  }

  async findByEmail(email) {
    this.ensureIsConnected()
    const users = await this.client.query(`SELECT * FROM users WHERE email = $1`, [email])

    const user = users.rows[0]

    if (!user) {
      return null
    }

    return new User(user.id, user.name, user.email, new UserPassword(user.password), user.age)
  }
  async findById(id) {
    this.ensureIsConnected()
    const users = await this.client.query(`SELECT * FROM users WHERE id = $1`, [id])

    const user = users.rows[0]

    if (!user) {
      return null
    }

    return new User(user.id, user.name, user.email, new UserPassword(user.password), user.age)
  }

  async existsByEmail(email) {
    this.ensureIsConnected()
    const users = await this.client.query(`SELECT COUNT(1) FROM users WHERE email = $1`, [email])

    return users.rows[0].count === "1"
  }

  async connect() {
    await this.client.connect()
    this.connected = true
  }

  async reset() {
    this.ensureIsConnected()
    await this.client.query("DELETE FROM users")
  }

  async disconnect() {
    this.ensureIsConnected()
    await this.client.end()
    this.connected = false
  }

  ensureIsConnected() {
    if (!this.connected) {
      throw new Error("UserRepository must be connected first")
    }
  }
}
