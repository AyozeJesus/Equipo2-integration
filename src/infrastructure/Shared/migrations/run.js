import pg from "pg"
import { up } from "./1695749510702.js"

export const client = new pg.Client({
  user: "admin",
  host: "localhost",
  database: "my-project",
  password: "password",
  port: "5432",
})

async function runMigrations() {
  try {
    await client.connect()
    console.log("Conexion exitosa")
    await up(client)
    console.log("Tabla 'users' creada con éxito")
    await client.end()
    console.log("Conexión cerrada")
  } catch (error) {
    console.error("Error:", error)
  }
}

runMigrations()
