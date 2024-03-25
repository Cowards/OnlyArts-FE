import API_URL from "./config.js";
class Http {
  constructor() {
    API_URL.then((res) => {
      this.api = res.url;
    });
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  async send(method, url, body) {
    const data = await fetch(`${this.api}${url}`, {
      method: method,
      headers: this.headers,
      body: body ? JSON.stringify(body) : undefined,
    }).then((res) =>
      res.json().then((data) => {
        if (!res.ok) {
          throw data.message;
        }
        return data;
      })
    );
    return data;
  }
}
export default new Http();
