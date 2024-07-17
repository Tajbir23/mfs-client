import { NavLink } from "react-router-dom"
import useProtect from "../hooks/useProtect"
import Loading from "./Loading"

const Home = () => {
    const {data, isLoading, error} = useProtect()
    const token = localStorage.getItem("token")

    console.log(error)

    if(isLoading){
        return <Loading />
    }
    if(!token || error){
        return <NavLink to="/login" />
    }
    if(data?.role){
        return <NavLink to="/dashboard" />
    }else{
        return <NavLink to="/login" />
    }
}

export default Home