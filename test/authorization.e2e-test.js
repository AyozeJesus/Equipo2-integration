import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"
import { Server } from "../src/infrastructure/API/Server"
import tepper from "tepper"

describe("authorization API", () => {
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
    await tepper(server.app)
      .post("/user/register")
      .send({
        name: "John Doe",
        email: "john@email12.com",
        password: "password",
        age: 18,
      })
      .run()

    const { body, status } = await tepper(server.app)
      .post("/user/login")
      .send({
        email: "john@email12.com",
        password: "password",
      })
      .run()

    console.log(body, "Este es el body") 
    expect(status).toBe(200)

    expect(body).toBeDefined()
    expect(typeof body.token).toBe("string")
    expect(body.token).toContain("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9")
  })
})
