//viết lại cho phù hợp với api đã tạo
class Http {
    constructor() {
        this.api = "http://localhost:4000";
        this.headers = {
            "Content-Type": "application/json",
        };
    }

    async send(method, url, body) {
        const data = await fetch(url, {
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
    async getDatas(tblName) {
        return await this.send("GET", `${this.api}/${tblName}`, null);
    }
}
export default new Http();