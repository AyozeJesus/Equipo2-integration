import "dotenv/config"

export const config = {
  postgres: {
    user: "admin",
    host: "localhost",
    database: "my-project",
    password: "password",
  },
  mongo: {
    user: "admin",
    password: "password",
    address: "localhost",
    port: "27017",
    database: "my-project",
  },
  mailgun: {
    user: "api",
    domain: "sandbox44ea06b312824e038c26fe47b695edac.mailgun.org",
    apiKey: process.env.MAILGUN_API_KEY,
  },
  testmail: {
    apikey: process.env.TESTMAIL_API_KEY,
    namespace: "3yq63",
  },
}
