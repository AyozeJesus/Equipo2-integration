import { describe, it, expect, beforeEach } from "vitest"
import { vi } from "vitest"
import { LoginController } from "./LoginController"
import { MissingRequiredFieldsError } from "../../domain/errors/MissingRequiredFieldsError"

describe("LoginController", () => {
  const token = "::fakeToken::"
  const email = "john@email.com"
  const password = "password"
  let mockLoginUser, res, controller, statusSpy, jsonSpy

  beforeEach(() => {
    mockLoginUser = { execute: vi.fn(() => token) }
    controller = new LoginController(mockLoginUser)

    jsonSpy = vi.fn()
    statusSpy = vi.fn(() => ({ json: jsonSpy }))

    res = { status: statusSpy }
  })

  it("should invoke login usecase", async () => {
    const req = {
      body: {
        email,
        password,
      },
    }

    await controller.execute(req, res)
    expect(mockLoginUser.execute).toHaveBeenCalledWith("john@email.com", "password")
  })

  it("should respond with status 200", async () => {
    const req = {
      body: {
        email,
        password,
      },
    }

    await controller.execute(req, res)
    expect(statusSpy).toHaveBeenCalledWith(200)
  })

  it("should respond with a user token", async () => {
    const req = {
      body: {
        email,
        password,
      },
    }

    await controller.execute(req, res)
    expect(jsonSpy).toHaveBeenCalledWith({ token })
  })

  it("should respond with 400 when email is missing", async () => {
    const req = {
      body: {
        password,
      },
    }

    const result = controller.execute(req, res)

    await expect(result).rejects.toBeInstanceOf(MissingRequiredFieldsError)
  })

  it("should respond with 400 when password is missing", async () => {
    const req = {
      body: {
        email,
      },
    }

    const result = controller.execute(req, res)

    await expect(result).rejects.toBeInstanceOf(MissingRequiredFieldsError)
  })
})
