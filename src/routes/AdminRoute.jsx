import { Navigate } from "react-router-dom"
import useProtect from "../hooks/useProtect"
import { useContext } from "react"
import { AuthContext } from "../provider/AuthContext"

const AdminRoute = ({children}) => {
    const {data, isLoading} = useProtect()
    const {loading, user} = useContext(AuthContext)

    if(isLoading || loading){
        return <h1>Loading...</h1>
    }

    if(data?.role!== "admin" || !data || user?.role!== "admin" ||!user){
        return localStorage.removeItem("token")
    }

    if(data?.role === "admin" || user?.role === "admin"){
        return children
    }

    return <Navigate to="/dashboard" />
}

export default AdminRoute;