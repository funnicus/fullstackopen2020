import axios from 'axios'

let token = null

export const useResource = (baseUrl) => {

    const setToken = newToken => {
      token = `bearer ${newToken}`
    }
    
    const getAll = () => {
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
    
    const update = (id, newObject) => {
      const request = axios.put(`${ baseUrl } /${id}`, newObject)
      return request.then(response => response.data)
    }

    return {
        setToken,
        getAll,
        create,
        update
    }
}