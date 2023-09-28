import { apiKEYFromtestMail } from "../../temp"

export class TestMail {
  async getEmails() {
    try {
      const urlSearchParams = new URLSearchParams({
        APIKEY: apiKEYFromtestMail,
        NAMESPACE: "3yq63",
        timestamp: Math.floor(Date.now() / 1000), // Usamos Math.floor para asegurar que sea un número entero
      })

      const apiUrl = `https://api.testmail.app/api/json?${urlSearchParams.toString()}`
      const response = await fetch(apiUrl, {
        method: "GET",
      })

      if (!response.ok) {
        throw new Error("Error al obtener los correos electrónicos.")
      }

      const data = await response.json()
      return data
    } catch (error) {
      throw new Error(`Error en getEmails: ${error.message}`)
    }
  }

  async getLastEmail() {
    try {
      const { emails } = await this.getEmails()

      if (emails && emails.length > 0) {
        const lastEmail = emails[emails.length - 1]
        return lastEmail
      } else {
        throw new Error("No se encontraron correos electrónicos recibidos.")
      }
    } catch (error) {
      throw new Error(`Error en getLastEmail: ${error.message}`)
    }
  }
}
