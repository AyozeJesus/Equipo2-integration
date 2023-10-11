import { describe, it, expect } from "vitest"
import { vi } from "vitest"
import { LoginController } from "./LoginController"

describe("LoginController", () => {
  it("should create a new user", async () => {
    const mockLoginUser = {
      execute: vi.fn(),
    }
    const controller = new LoginController(mockLoginUser)

    const req = {
      body: {
        email: "john@email.com",
        password: "password",
      },
    }

    const res = {
      status: vi.fn(() => res),
      json: vi.fn(),
    }

    await controller.execute(req, res)
    expect(mockLoginUser.execute).toHaveBeenCalledWith("john@email.com", "password")
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalled()
  })

  it("should return status '400' when required fields are missing", async () => {
    const mockLoginUser = {
      execute: vi.fn().mockRejectedValue(new Error("Faltan campos obligatorios")),
    }
    const controller = new LoginController(mockLoginUser)

    const req = {
      body: {
        name: "John Doe",
        email: "john@email.com",
        password: "password",
      },
    }

    const res = {
      status: vi.fn(() => res),
      json: vi.fn(),
    }

    await controller.execute(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: "Faltan campos obligatorios" })
  })
})
