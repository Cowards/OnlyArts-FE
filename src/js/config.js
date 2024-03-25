const send = async (method, url) => {
  const data = await fetch(url, {
    method: method,
  }).then((res) =>
    res.json().then((data) => {
      return data;
    })
  );
  return data;
};
const URL_API = send("GET", "/geturl");
export default URL_API;
