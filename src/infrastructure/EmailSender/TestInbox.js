import { sleep } from "../../domain/utils/sleep.js"
import { config } from "../Shared/config.js"

export class TestInbox {
  constructor(key = config.testmail.apikey) {
    this.messages = []
    this.apikey = key
  }
  async getEmails(from) {
    const params = new URLSearchParams({
      apikey: this.apikey,
      namespace: config.testmail.namespace,
      pretty: true,
      timestamp_from: from.getTime(),
    })
    const response = await fetch(`https://api.testmail.app/api/json?${params.toString()}`)

    if (response.status === 401) {
      throw new Error("Invalid TestInbox Apikey")
    }
    const data = await response.json()
    return data.emails
  }

  async getEmailsInLast5Seconds() {
    const now = new Date()
    const fiveSecondsAgo = new Date(now.getTime() - 3000)
    return await this.getEmails(fiveSecondsAgo)
  }

  async getLastEmail() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const emails = await this.getEmailsInLast5Seconds()
      if (emails.length > 0) {
        return emails[0]
      }
      await sleep(100)
    }
  }
}
