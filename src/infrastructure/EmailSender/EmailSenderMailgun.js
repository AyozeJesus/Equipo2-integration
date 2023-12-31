import { EmailSender } from "../../domain/services/EmailSender.js"
import { config } from "../Shared/config.js"

export class EmailSenderMailgun extends EmailSender {
  constructor(key = config.mailgun.apiKey) {
    super()
    this.key = key
  }
  async sendWelcomeEmail(user) {
    const body = new FormData()
    const domain = config.mailgun.domain

    body.append("from", `Ayoze Jesus <mailgun@${domain}>`)
    body.append("to", user.email.email)
    body.append("subject", "Hello")
    body.append("text", "¡Bienvenido a Mi proyecto John Doe!")

    const mailgunUser = config.mailgun.user
    const response = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(mailgunUser + ":" + this.key),
      },
      body,
    })

    if (response.status === 401) {
      throw new Error("Invalid Mailgun Apikey")
    }
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message)
    }
  }
}
