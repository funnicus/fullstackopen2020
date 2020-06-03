import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
        headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(res => {
      console.log(res);
      return res.data
  });
}

const remove = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(res => {
          console.log(res);
          return getAll();
      });
}

export default { setToken, getAll, create, update, remove }