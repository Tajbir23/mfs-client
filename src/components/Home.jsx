import { NavLink, useNavigate } from "react-router-dom"
import useProtect from "../hooks/useProtect"
import Loading from "./Loading"

const Home = () => {
    const {data, isLoading, error} = useProtect()
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    console.log(error)

    if(isLoading){
        return <Loading />
    }
    if(!token || error){
        return <NavLink to="/login" />
    }
    if(data.role){
        console.log(data.role)
        return navigate("/dashboard")
        // return <NavLink to="/dashboard" />
    }
        return <NavLink to="/login" />
    
}

export default Home