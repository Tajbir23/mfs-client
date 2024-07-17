import { useQuery, useQueryClient } from "@tanstack/react-query"

import Loading from "../../Loading"
import { Button, Table } from "antd"
import useAxiosPublic from "../../../hooks/useAxiosPublic"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import toast from "react-hot-toast"



const ManageTransaction = () => {
  const axiosPublic = useAxiosPublic()
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()


  const {data, isLoading, isError, refetch} = useQuery({
    queryKey: "manageTransaction",
    queryFn: async () => {
      axiosPublic.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
      const res = await axiosPublic.get('/cash_in_requests')
      const result = res.data
      return result
    }
  })

  console.log(data)
  if(isLoading) return <Loading />
  if(isError) return console.log(isError)

    const handleTransaction = async(record, status) => {
      console.log(record,status)
      try {
        const res = await axiosSecure.post("/manage_cash_in_request", {status, id: record._id, userEmail: record.requestEmail, userPhone: record.requestPhone,  amount: record.amount})
        const result = await res.data
        console.log(result)
        if(result?.message){
          toast.success(result?.message)
          queryClient.invalidateQueries("protect")
          refetch()
        }
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message)
      }
    }


    const columns = [
      {
        title: "Name",
        dataIndex: "requestName",
        key: "requestName",
      },
      {
        title: "Email",
        dataIndex: "requestEmail",
        key: "requestEmail",
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        render: (text, record) => {
          return (
            <div className="flex gap-5">
              <Button onClick={() => handleTransaction(record, "accept")}>Approve</Button>
              <Button onClick={() => handleTransaction(record, "cancelled")}>Reject</Button>
            </div>
          )
        }
      }
    ]

  return (
    <div>
      <Table dataSource={data} columns={columns} />
    </div>
  )
}

export default ManageTransaction