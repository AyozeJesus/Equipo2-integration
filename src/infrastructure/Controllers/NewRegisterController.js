export class NewRegisterController {
  constructor(registrerUser) {
    this.registrerUser = registrerUser
  }

  execute = async (req, res) => {
    const { name, email, age, password } = req.body
    if (!name || !email || !age || !password) {
      res.status(400).json({ error: "Faltan campos obligatorios" })
      return
    }

    await this.registrerUser.execute(name, email, password, age)

    res.status(200).json({ message: "new user register" })
  }
}
