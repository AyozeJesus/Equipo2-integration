import { EmailSender } from "../../domain/services/EmailSender"
import { apiKey } from "../../temp"
export class EmailSenderMailgun extends EmailSender {
  async sendWelcomeEmail(user) {
    const body = new FormData()
    const domain = "sandbox0dd99d6ef428421fb1679603fd847268.mailgun.org"

    body.append("from", `<mailgun@${domain}>`)
    body.append("to", user.email.email)
    body.append("subject", "Hello")
    body.append("text", "Testing some Mailgun awesomeness!")

    const mailgunUser = "api"
    const response = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(mailgunUser + ":" + apiKey),
      },
      body,
    })
    const data = await response.json()
    console.log(data)
  }
}
