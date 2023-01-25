import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://ranekapilocal.local/wp-json/api'
})

export const api = {
  get (endpoint) {
    return axiosInstance.get(endpoint)
  },
  post (endpoint, body) {
    return axiosInstance.post(endpoint, body)
  },
  put (endpoint, body) {
    return axiosInstance.put(endpoint, body)
  },
  delete (endpoint) {
    return axiosInstance.delete(endpoint)
  }
}

export function getCep (cep) {
  return axios.get(`http://viacep.com.br/ws/${cep}/json/`)
}
