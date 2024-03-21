require('dotenv').config()

class Http {
  constructor() {
    ;(this.API_KEY = process.env.API_KEY),
      (this.header = {
        'Content-Type': 'application/json',
        authtoken: localStorage.getItem('authtoken') || undefined
      })
  }

  async send(method, url, body) {
    try {
      const response = await fetch(this.api + url, {
        method: method,
        headers: this.header,
        body: body ? JSON.stringify(body) : undefined
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message)
      }
      const data = await response.text()
      return data
    } catch (error) {
      throw error
    }
  }
}

export default new Http()
