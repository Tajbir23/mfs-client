import { Navigate } from "react-router-dom"

import { useContext } from "react"
import { AuthContext } from "../provider/AuthContext"

const AdminRoute = ({children}) => {

    const {loading, user} = useContext(AuthContext)

    if( loading){
        return <h1>Loading...</h1>
    }

    if(user?.role!== "admin" || !user || user?.role!== "admin" ){
        return localStorage.removeItem("token")
    }

    if(user?.role === "admin" || user?.role === "admin"){
        return children
    }

    return <Navigate to="/login" />
}

export default AdminRoute;