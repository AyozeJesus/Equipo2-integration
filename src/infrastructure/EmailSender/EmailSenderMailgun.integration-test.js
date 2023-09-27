import { describe, it, expect } from "vitest"
import { EmailSenderMailgun } from "./EmailSenderMailgun"
import { User } from "../../domain/models/User"

describe("EmailSenderMailgun", () => {
  it.only("sends the welcome email to a user", async () => {
    const emailSender = new EmailSenderMailgun()
    const id = "00000000-0000-0000-0000-000000000000"
    const name = "Cristobal"
    const email = "ctaverafernandez@gmail.com"
    const age = 18
    const password = "password"
    const user = User.create(id, name, email, password, age)

    await emailSender.sendWelcomeEmail(user)

    const lastEmail = await testMail.getLastEmail()
    expect(lastEmail.html).toMatch("Testing some Mailgun awesomeness!")
  })
})
