export class NewRegisterController {
  constructor(registrerUser) {
    this.registrerUser = registrerUser
  }

  execute = async (req, res) => {
    try {
      const { name, email, age, password } = req.body
      if (!name || !email || !age || !password) {
        res.status(400).json({ error: "Faltan campos obligatorios" })
        return
      }

      await this.registrerUser.execute(name, email, password, age)

      res.status(200).json()
    } catch (error) {
      console.error("Error al crear un nuevo usuario:", error)
      res.status(500).json({ error: "No se pudo crear el usuario" })
    }
  }
}
