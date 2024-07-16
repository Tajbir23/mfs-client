import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const axiosPublic = useAxiosPublic()
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const unsubscribe = async()=> {
            try {
                axiosPublic.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
                const res = await axiosPublic.get('/auth');
                console.log(res.data)
                setUser(res.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        
        return () => {
            return unsubscribe()
        }
    },[axiosPublic])

    const logOut = () => {
        localStorage.removeItem('token')
        setUser(null)
        setLoading(false)
    }

    const authInfo = {
        user,
        loading,
        setLoading,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider