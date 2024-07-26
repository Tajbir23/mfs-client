import axios from "axios"
import base_url from "../components/api"

const axiosPublic = axios.create({
    // baseURL: "http://localhost:5000"
    // baseURL: import.meta.env.BASE_URL
    baseURL: base_url
})

const useAxiosPublic = () => {
  return axiosPublic
}

export default useAxiosPublic