import { UserRepository } from "../../domain/repository/UserRepository.js"
import { User } from "../../domain/models/User.js"
import { UserPassword } from "../../domain/models/UserPassword.js"
import { mongoClient } from "./MongoClient.js"
import { config } from "../Shared/config.js"

export class UserRepositoryMongo extends UserRepository {
  constructor() {
    super()
    this.client = mongoClient
    this.database = this.client.db(config.mongo.database)
    this.users = this.database.collection("users")
    this.connected = false
  }

  async connect() {
    await this.client.connect()
    this.connected = true
  }

  async disconnect() {
    this.ensureIsConnected()
    await this.client.close()
    this.connected = false
  }

  async reset() {
    this.ensureIsConnected()
    await this.users.deleteMany({})
  }

  async save(user) {
    this.ensureIsConnected()
    await this.users.insertOne({ ...user })
  }

  async findByEmail(email) {
    this.ensureIsConnected()

    const user = await this.users.findOne({ email })

    if (!user) {
      return null
    }

    return new User(user.id, user.name, user.email, new UserPassword(user.password), user.age)
  }
  async findById(id) {
    this.ensureIsConnected()
    const savedUser = await this.users.findOne({ id })

    if (!savedUser) {
      return null
    }

    return new User(
      savedUser.id,
      savedUser.name,
      savedUser.email.email,
      new UserPassword(savedUser.password.password),
      savedUser.age.age,
    )
  }

  async existsByEmail(email) {
    this.ensureIsConnected()
    const savedUser = await this.users.findOne({ "email.email": email }, { projection: { _id: 1 } })

    return Boolean(savedUser)
  }

  ensureIsConnected() {
    if (!this.connected) {
      throw new Error("UserRepository must be connected first")
    }
  }
}
