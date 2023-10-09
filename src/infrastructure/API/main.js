import express from "express"
import { NewRegisterController } from "../Controllers/NewRegisterController.js"
import { RegisterUser } from "../../application/RegisterUser.js"
import { UserRepositoryPostgresSQL } from "../UserRepository/UserRepositoryPostgresSQL.js"
import { EmailSenderMock } from "../EmailSender/EmailSenderMock.js"
import { IdGeneratorNode } from "../IdGenerator/IdGeneratorNode.js"
import { errorCodeToStatus } from "./errorCodeToStatus.js"

export function errorHandler(err, req, res, next) {
  const statusCode = errorCodeToStatus(err.code)
  res.status(statusCode).json({ code: err.code, error: err.message })
}

export const app = express()

const userRepository = new UserRepositoryPostgresSQL()

await userRepository.connect()

app.use(express.json())

const emailSender = new EmailSenderMock()
const idGenerator = new IdGeneratorNode()

const registerUser = new RegisterUser(userRepository, idGenerator, emailSender)
const registerController = new NewRegisterController(registerUser)
app.post("/user/register", registerController.execute)

app.use(errorHandler)

app.listen(3000, () => {
  console.log(`Servidor escuchando en el puerto 3000`)
})
