import axios from "axios"

export const createAxiosInstance = () => {
    console.log(process.env.REACT_APP_BASE_URL)
  return axios.create({
    baseURL: "http://localhost:8080/",
    withCredentials: true,
    timeout: 120000
  })
}

export default createAxiosInstance()