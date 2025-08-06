import axios from 'axios'
const baseUrl = '/api/users'
import blogService from './blogs'

let token = blogService.getToken()

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

export default { getAll }
