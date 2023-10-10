import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"
import { Server } from "./Server"
import tepper from "tepper"

describe("API", () => {
  let server
  beforeAll(async () => {
    server = Server.createForTesting()
    await server.connect()
  })

  afterAll(async () => {
    await server.disconnect()
  })

  beforeEach(async () => {
    await server.reset()
  })

  it("user is registered properly", async () => {
    const { status, body } = await tepper(server.app)
      .post("/user/register")
      .send({
        name: "John Doe",
        email: "john@email12.com",
        password: "password",
        age: 18,
      })
      .run()

    console.log(body)
    expect(status).toBe(200)
    expect(body).toStrictEqual({ message: "new user register" })
  })
})
