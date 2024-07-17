

import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading";
import { Table } from "antd";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const Transaction = () => {
  const axiosPublic = useAxiosPublic()
  const {data, isLoading, isError} = useQuery({
    queryKey: 'transaction',
    queryFn: async() => {
      axiosPublic.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
      const result = await axiosPublic.get('/transaction')
      const transaction = result.data;
      return transaction
    }
  })

  if(isLoading){
    return <Loading />
  }

  if(isError){
    console.log(isError)
  }

  console.log(data)

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Deducted',
      dataIndex:'deducted',
      key:'deducted',
    },
    {
      title: 'Agent',
      dataIndex:'agent',
      key:'agent',
    },
    {
      title: 'Receiver',
      dataIndex:'receiver',
      key:'receiver',
    },
    {
      title: 'Status',
      dataIndex:'status',
      key:'status',
    },
    {
      title: 'Date',
      dataIndex:'date',
      key:'date',
    }
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold">Transaction History</h1>
      <Table dataSource={data} columns={columns} />
    </div>
  )
}

export default Transaction