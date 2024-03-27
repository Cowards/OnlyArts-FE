const urlGetAPI = window.location.origin + "/geturl";

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

export const getUrl = async function () {
  return send("GET", urlGetAPI).then((data) => {
    return data.url;
  });
};

// => async () =>
//   await send("GET", urlGetAPI).then((data) => {
//     return data.url;
//   });
