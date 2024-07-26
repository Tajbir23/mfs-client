import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import useAxiosPublic from "../../../hooks/useAxiosPublic"
import { Table } from "antd"
import Loading from "../../Loading"
import DetailsColumns from "./DetailsColumns"
import { useState } from "react"




const Details = () => {
    const {id,name} = useParams()
    const axiosPublic = useAxiosPublic()
    const [currentPage, setCurrentPage] = useState(1)

    const {data, isLoading, isError} = useQuery({
        queryKey: ['detailsType', currentPage],
        queryFn: async() => {
            axiosPublic.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
            const res = await axiosPublic.get(`/type_details/${id}?currentPage=${currentPage}`)
            const result = await res.data
            return result
        }
    })

    console.log(data)

    if(isLoading) return <Loading />
    if(isError) return console.log(isError)

    console.log(currentPage)
    
  return (
    <div>
        <h1 className="font-bold mb-5 text-xl">{name}</h1>
        <Table dataSource={data.data} columns={DetailsColumns(id)} pagination={
          {pageSize: 10,
          current : currentPage,
          total: data.totalDocuments,
          onChange : (page) => setCurrentPage(page)  
          }
        } />
    </div>
  )
}

export default Details