import express from "express"
import { NewRegisterController } from "../Controllers/NewRegisterController.js"
import { RegisterUser } from "../../application/RegisterUser.js"
import { UserRepositoryPostgresSQL } from "../UserRepository/UserRepositoryPostgresSQL.js"
import { EmailSenderMock } from "../EmailSender/EmailSenderMock.js"
import { EmailSenderMailgun } from "../EmailSender/EmailSenderMailgun.js"
import { IdGeneratorNode } from "../IdGenerator/IdGeneratorNode.js"
import { errorHandler } from "./errorHandler.js"
import { LoginController } from "../Controllers/LoginController.js"
import { LoginUser } from "../../application/LoginUser.js"

export class Server {
  static createForTesting() {
    return new Server({
      emailSender: new EmailSenderMock(),
    })
  }

  constructor(dependencies = {}) {
    this.dependencies = this.createDependencies(dependencies)
    this.app = express()

    this.app.use(express.json())
    this.app.post("/user/register", this.dependencies.registerController.execute)
    this.app.post("/user/login", this.dependencies.loginController.execute)

    this.app.use(errorHandler)
  }

  createDependencies({ userRepository = new UserRepositoryPostgresSQL(), emailSender = new EmailSenderMailgun() }) {
    const idGenerator = new IdGeneratorNode()
    const registerUser = new RegisterUser(userRepository, idGenerator, emailSender)
    const registerController = new NewRegisterController(registerUser)
    const loginUser = new LoginUser(userRepository)
    const loginController = new LoginController(loginUser)

    return {
      userRepository,
      idGenerator,
      emailSender,
      registerController,
      registerUser,
      loginController,
    }
  }

  async connect() {
    await this.dependencies.userRepository.connect()
  }

  async reset() {
    await this.dependencies.userRepository.reset()
  }

  async disconnect() {
    await this.dependencies.userRepository.disconnect()
  }

  listen() {
    this.app.listen(3000, () => {
      console.log("Server listening on port 3000")
    })
  }
}
