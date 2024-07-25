import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import useAxiosPublic from "../../../hooks/useAxiosPublic"
import { Table } from "antd"
import Loading from "../../Loading"
import DetailsColumns from "./DetailsColumns"




const Details = () => {
    const {id,name} = useParams()
    const axiosPublic = useAxiosPublic()

    const {data, isLoading, isError} = useQuery({
        queryKey: 'detailsType',
        queryFn: async() => {
            axiosPublic.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
            const res = await axiosPublic.get(`/type_details/${id}`)
            const result = await res.data
            return result
        }
    })

    console.log(data)

    if(isLoading) return <Loading />
    if(isError) return console.log(isError)

    
    
  return (
    <div>
        <h1 className="font-bold mb-5 text-xl">{name}</h1>
        <Table dataSource={data} columns={DetailsColumns(id)} />
    </div>
  )
}

export default Details