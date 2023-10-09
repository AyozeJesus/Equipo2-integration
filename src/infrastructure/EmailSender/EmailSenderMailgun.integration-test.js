import { describe, expect, it } from "vitest"
import { EmailSenderMailgun } from "./EmailSenderMailgun.js"
import { User } from "../../domain/models/User.js"
import { TestInbox } from "./TestInbox.js"

describe("EmailSenderMailgun", () => {
  it("sends the welcome email to a user", async () => {
    const emailSender = new EmailSenderMailgun()
    const testInbox = new TestInbox()
    const id = "00000000-0000-0000-0000-000000000000"
    const name = "John Doe"
    const email = "3yq63.test@inbox.testmail.app"
    const age = 18
    const password = "password"
    const user = User.create(id, name, email, password, age)

    await emailSender.sendWelcomeEmail(user)

    const receivedEmail = await testInbox.getLastEmail()
    expect(receivedEmail.text).toMatch("¡Bienvenido a Mi proyecto John Doe!")
  }, 10000)

  it("throws an error if email is invalid", async () => {
    const emailSender = new EmailSenderMailgun()
    // eslint-disable-next-line no-unused-vars
    const testInbox = new TestInbox()
    const id = "00000000-0000-0000-0000-000000000000"
    const name = "John Doe"
    const email = "@"
    const age = 18
    const password = "password"
    const user = User.create(id, name, email, password, age)

    const result = emailSender.sendWelcomeEmail(user)

    expect(result).rejects.toThrow("to parameter is not a valid address. please check documentation")
  })

  it("it throws an error if the key is invalid", async () => {
    const emailSender = new EmailSenderMailgun("1234")
    const id = "00000000-0000-0000-0000-000000000000"
    const name = "John Doe"
    const email = "3yq63.test@inbox.testmail.app"
    const age = 18
    const password = "password"
    const user = User.create(id, name, email, password, age)

    const result = emailSender.sendWelcomeEmail(user)

    expect(result).rejects.toThrow("Invalid Mailgun Apikey")
  })
  it("it throws an error if test inbox apikey is invalid", async () => {
    const testInbox = new TestInbox("1234")

    const result = testInbox.getLastEmail()

    expect(result).rejects.toThrow("Invalid TestInbox Apikey")
  })
})
