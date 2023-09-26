import pg from "pg"
import { UserRepository } from "../../domain/repository/UserRepository.js"
import { UserPassword } from "../../domain/models/UserPassword.js"
import { User } from "../../domain/models/User.js"
export class UserRepositoryPostgressSql extends UserRepository {
  constructor() {
    super()
    this.client = new pg.Client({
      user: "admin",
      password: "password",
      database: "my-project",
      host: "localhost",
      port: 5432,
    })
  }

  async connect() {
    await this.client.connect()
  }

  async disconnect() {
    await this.client.end()
  }

  async reset() {
    await this.client.query("delete from users")
  }

  async save(user) {
    const query = `
      INSERT INTO users (id, name, email, password, age)
      VALUES ($1, $2, $3, $4, $5)
      `

    const values = [user.id, user.name, user.email.email, user.password.password, user.age.age]

    await this.client.query(query, values)
  }

  async findById(id) {
    const query = `
      SELECT * FROM users
      WHERE id = $1
    `

    const values = [id]

    const result = await this.client.query(query, values)
    const userResult = result.rows[0]
    if (!userResult) {
      return null
    }
    return new User(
      userResult.id,
      userResult.name,
      userResult.email,
      new UserPassword(userResult.password),
      userResult.age,
    )
  }

  async existsByEmail(email) {
    const query = `
    SELECT *
    FROM users
    WHERE email = $1
  `

    const values = [email]
    const result = await this.client.query(query, values)
    const userResult = result.rows[0]

    return Boolean(userResult)
  }
}
