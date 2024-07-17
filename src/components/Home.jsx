import { NavLink } from "react-router-dom"
import useProtect from "../hooks/useProtect"
import Loading from "./Loading"

const Home = () => {
    const {data, isLoading} = useProtect()

    if(isLoading){
        return <Loading />
    }
    if(data?.role){
        return <NavLink to="/dashboard" />
    }else{
        return <NavLink to="/login" />
    }
}

export default Home