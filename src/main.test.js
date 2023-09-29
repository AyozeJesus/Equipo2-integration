import { describe, it, expect } from "vitest"
import request from "supertest"
import { app } from "./main"
describe("NewRegisterController", () => {
  it.skip("debería registrar un nuevo usuario", async () => {
    const userData = {
      name: "Johnaa Doe",
      email: "johnas@example.com",
      password: "contraseña123",
      age: 30,
    }

    const response = await request(app).post("/user/register").send(userData)

    expect(response.status).toBe(200)
  })
})
