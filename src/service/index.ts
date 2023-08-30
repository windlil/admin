import Request from './request'
import { BASE_URL } from './request/config'

const useAxios = new Request({
  baseURL: BASE_URL,
})

export default useAxios
