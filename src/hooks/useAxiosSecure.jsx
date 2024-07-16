import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthContext";

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000"
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logOut, setLoading} = useContext(AuthContext)

    axiosSecure.interceptors.request.use(
        async config => {
            setLoading(true)
            const token = localStorage.getItem('token')
            if(token){
                config.headers.common['Authorization'] = `Bearer ${token}`
            }
            return config
        },
        error => {
            setLoading(false)
            return Promise.reject(error)
        }
    )

    axiosSecure.interceptors.response.use(
        response => {
            setLoading(false)
            return response
        },
        async error => {
            setLoading(false)
            if(error.response.status === 401 || error.response.status === 403){
                logOut()
                navigate('/login')
            }
            return Promise.reject(error)
        }
    )

    return axiosSecure
}

export default useAxiosSecure;