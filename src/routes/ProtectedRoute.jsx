import { useContext } from "react";
import useProtect from "../hooks/useProtect"
import { AuthContext } from "../provider/AuthContext";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({children}) => {
    const {data, isLoading} = useProtect();
    const {loading, user} = useContext(AuthContext)

    if(isLoading || loading){
        return <h1>Loading...</h1>
    }

    if(data?.role && data?.status !== "block"){
        return children
    }
    return <Navigate to="/login" />
}

export default ProtectedRoute