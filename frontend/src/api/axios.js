import axios from "axios"

export const createAxiosInstance = () => {
  return axios.create({
    baseURL: "https://backend-fvbmnx6qhq-as.a.run.app/",
    withCredentials: true,
    timeout: 120000
  })
}

export default createAxiosInstance()