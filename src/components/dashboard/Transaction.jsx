

import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading";
import { Button, Table } from "antd";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useRef, useState } from "react";


const Transaction = () => {
  const printRef = useRef();

  const axiosPublic = useAxiosPublic()
  const [role, setRole] = useState('')
  const {data, isLoading, isError} = useQuery({
    queryKey: 'transaction',
    queryFn: async() => {
      axiosPublic.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
      const result = await axiosPublic.get('/transaction')
      const transaction = result.data.result;
      setRole(result.data.role)
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


  if(role === 'agent'){

    delete columns[3]

    columns[4] = {
      title: 'Requested phone',
        dataIndex:'requestPhone',
        key:'requestPhone',
    }
  }

  const handlePrint = () => {
    const printWindow = window.open();
    printWindow.document.write('<html><head><title>Transaction history</title>');

    // Copy styles
    Array.from(document.styleSheets).forEach((styleSheet) => {
      if (styleSheet.href) {
        printWindow.document.write(`<link rel="stylesheet" type="text/css" href="${styleSheet.href}">`);
      } else if (styleSheet.cssRules) {
        printWindow.document.write('<style>');
        Array.from(styleSheet.cssRules).forEach((rule) => {
          printWindow.document.write(rule.cssText);
        });
        printWindow.document.write('</style>');
      }
    });

    printWindow.document.write('</head><body>');
    printWindow.document.write(printRef.current.outerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();

    // Wait for the content to be fully loaded and then print
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  };

  return (
    <div  className="overflow-hidden">
      <h1 className="text-2xl font-bold mb-5">Transaction History</h1>
      <Table ref={printRef} dataSource={data} columns={columns} pagination={false} />
      <Button onClick={() => handlePrint()}>Print History</Button>
    </div>
  )
}

export default Transaction