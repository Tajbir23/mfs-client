import { useContext } from "react"
import { AuthContext } from "../provider/AuthContext"
import Loading from "./../components/Loading"
import { Navigate } from "react-router-dom"

const AgentRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)

    if(loading){
        return <Loading />
    }

    if(!user || user.role !==  "agent" || user.status !== "active"){
        localStorage.removeItem('token')
        return <Navigate to="/login" />
    }

    if(user && user.role == "agent"){
        return children
    }
}

export default AgentRoute