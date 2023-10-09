import express from "express"
import { NewRegisterController } from "../Controllers/NewRegisterController.js"
import { RegisterUser } from "../../application/RegisterUser.js"
import { UserRepositoryPostgresSQL } from "../UserRepository/UserRepositoryPostgresSQL.js"
import { EmailSenderMock } from "../EmailSender/EmailSenderMock.js"
import { IdGeneratorNode } from "../IdGenerator/IdGeneratorNode.js"
import { errorHandler } from "./errorHandler.js"

export const app = express()

const userRepository = new UserRepositoryPostgresSQL()

//await userRepository.connect()

app.use(express.json())

const emailSender = new EmailSenderMock()
const idGenerator = new IdGeneratorNode()

const registerUser = new RegisterUser(userRepository, idGenerator, emailSender)
const registerController = new NewRegisterController(registerUser)
app.post("/user/register", registerController.execute)
console.log("esta llegando aqui")
app.use(errorHandler)

app.listen(3000, () => {
  console.log(`Servidor escuchando en el puerto 3000`)
})
