import { describe, expect, it } from "vitest"
import tepper from "tepper"
import { app } from "./app.js"

describe("API", () => {
  it.only("GET /hello-world should respond as expected", async () => {
    const { status, body } = await tepper(app).get("/hello-world").run()

    expect(status).toStrictEqual(200)
    expect(body).toEqual({ hello: "world" })
  })
})
