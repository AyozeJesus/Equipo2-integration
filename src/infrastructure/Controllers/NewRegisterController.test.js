import { describe, it, expect } from "vitest"
import { vi } from "vitest"
import { NewRegisterController } from "./NewRegisterController"

describe("NewRegisterController", () => {
  it("should create a new user", async () => {
    const mockRegistrerUser = {
      execute: vi.fn(),
    }
    const controller = new NewRegisterController(mockRegistrerUser)

    const req = {
      body: {
        name: "John Doe",
        email: "john@email.com",
        password: "password",
        age: 18,
      },
    }

    const res = {
      status: vi.fn(() => res),
      json: vi.fn(),
    }

    await controller.execute(req, res)
    expect(mockRegistrerUser.execute).toHaveBeenCalledWith("John Doe", "john@email.com", "password", 18)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalled()
  })
  it("shoul return status '500' when cant registrer the user", async () => {
    const mockRegistrerUser = {
      execute: vi.fn().mockRejectedValue(new Error("Error al registrar el usuario")),
    }
    const controller = new NewRegisterController(mockRegistrerUser)

    const req = {
      body: {
        name: "John Doe",
        email: "john@email.com",
        age: 18,
        password: "password",
      },
    }

    const res = {
      status: vi.fn(() => res),
      json: vi.fn(),
    }

    await controller.execute(req, res)

    expect(mockRegistrerUser.execute).toHaveBeenCalledWith("John Doe", "john@email.com", "password", 18)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: "No se pudo crear el usuario" })
  })
  it("shoul return status '400' when required fields are missing", async () => {
    const mockRegistrerUser = {
      execute: vi.fn().mockRejectedValue(new Error("Faltan campos obligatorios")),
    }
    const controller = new NewRegisterController(mockRegistrerUser)

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
  it("shoul return status '400' when required fields are missing", async () => {})
})
