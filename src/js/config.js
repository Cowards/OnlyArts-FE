const urlGetAPI = window.location.origin + "/geturl";
console.log(urlGetAPI);

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

const URL_API = send("GET", urlGetAPI).then((data) => {
  return data.url;
});
export default URL_API;
