import { useContext } from "react";
import { AuthContext } from "../provider/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useProtect = () => {
    const {setUser} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const {data, isLoading, error} = useQuery({
        queryKey: "protect",
        queryFn: async () => {
            const res = await axiosSecure.get("/auth")
            const data = await res.data
            console.log(data)
            if(data?.role){
                setUser(data)
                return data
            }
        }
    })

    if(error){
        console.log(error)
    }

    return {data, isLoading}
}

export default useProtect;