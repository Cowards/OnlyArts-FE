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
const URL_API = "http://localhost:8080/OnlyArts";
export default URL_API;
