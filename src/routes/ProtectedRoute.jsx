import { useContext } from "react";
import useProtect from "../hooks/useProtect"
import { AuthContext } from "../provider/AuthContext";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";


const ProtectedRoute = ({children}) => {
    const {data, isLoading} = useProtect();
    const {loading, user} = useContext(AuthContext)

    if(isLoading || loading){
        return <Loading />
    }

    if(data?.role && data?.status !== "block" && user){
        return children
    }
    
    return <Navigate to="/login" />
}

export default ProtectedRoute