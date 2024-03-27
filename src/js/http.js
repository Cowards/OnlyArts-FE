import { getUrl } from "./config.js";
class Http {
  constructor() {
    this.headers = {
      "Content-Type": "application/json",
      authtoken: localStorage.getItem("authtoken") || undefined,
    };
  }

  async setAPI() {
    this.api = await getUrl();
  }

  async send(method, url, body) {
    await this.setAPI();
    console.log(this.api);
    console.log(url);
    console.log(body);
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
