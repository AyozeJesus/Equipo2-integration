import { MissingRequiredFieldsError } from "../../domain/errors/MissingRequiredFieldsError.js"

export class LoginController {
  constructor(loginUser) {
    this.loginUser = loginUser
  }

  execute = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
      throw new MissingRequiredFieldsError()
    }

    const token = await this.loginUser.execute(email, password)
    console.log(token, "token")
    res.status(200).json({ token })
  }
}
