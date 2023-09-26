import pg from "pg"
import { UserRepository } from "../../domain/repository/UserRepository.js"
import { User } from "../../domain/models/User.js"
import { UserPassword } from "../../domain/models/UserPassword.js"
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
    
  }

  async existsByEmail(email) {}
}
