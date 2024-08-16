export const apiCall = (method, urlSuffix, auth, body) => {
  const url = `${import.meta.env.VITE_SV_TECH_API}/${urlSuffix}`
  const token = localStorage.getItem('token')
  const headers = auth ?
    {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    } :
    {
      'Content-Type': 'application/json',
    }
  return fetch(url, {
    method: method,
    headers,
    body: body,
    mode: 'cors',
  })
    .then((res) => {
      if (res.status === 200) {
      }
      return res.json()
    })
    .then((data) => {
      if (data.error) {
        return
      }
      return data
    }).catch((err) => {
      throw new Error(err)
    })
}