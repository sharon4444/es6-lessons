const fetchPost = (url, params) => {
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencode'
    },
    params: params
  }).then(res => {
    if (!res.ok) {
      throw Error(res.statusText)
    } else {
      return res.json()
    }
  })
}
const fetchJson = (url, params) => {
  return fetch(url, {
      method: 'GET',
      headers: {},
      credentials: 'include',
      params: params
  }).then((res) => {
      if (!res.ok) {
          throw Error(res.statusText);
      }
      return res.json();
  });
};
export { fetchPost, fetchJson }