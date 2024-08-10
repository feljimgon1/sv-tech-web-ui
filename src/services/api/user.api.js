export const handleGetUser = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const url = `${import.meta.env.VITE_SV_TECH_API}/users/${id}`;
  const headers = {
    'Content-Type': 'application/json',
  };

  return fetch(url, {
    method: 'GET',
    headers,
  })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log('Error:', error);
    });
};


export const handleActivateUser = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const url = `${import.meta.env.VITE_SV_TECH_API}/users/verify/${id}`;
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify({ id });

  return fetch(url, {
    method: 'PATCH',
    headers,
    body
  })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log('Error:', error);
    })
}