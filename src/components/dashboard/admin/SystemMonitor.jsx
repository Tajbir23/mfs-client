import { useQuery } from "@tanstack/react-query";
import { TbCoinTakaFilled } from "react-icons/tb";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../Loading";

import { useState } from "react";


import io from 'socket.io-client'
import SystemCard from "./SystemCard";
const socket = io('http://localhost:5000')


const getRandomColor = () => {
  const colors = [
    'bg-red-600', 'bg-blue-600', 'bg-green-600', 'bg-yellow-600',
    'bg-purple-600', 'bg-pink-600', 'bg-indigo-600', 'bg-teal-600',
    'bg-gray-600', 'bg-orange-600'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const SystemMonitor = () => {
  const axiosPublic = useAxiosPublic();
  const [data, setData] = useState(null)
  const { data: systemMonitor, isLoading, isError } = useQuery({
    queryKey: "systemMonitor",
    queryFn: async () => {
      axiosPublic.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
      const res = await axiosPublic.get("/system_monitoring");
      const result = res.data;
      setData(result)
      return result;
    }
  });

  if (isLoading) return <Loading />;
  if (isError) return console.log(isError);

  socket.on('system_monitoring_update', async(update) => {
    setData(update)
  })

  const info = [
    
    { name: 'Total Users', value: data?.totalUser , type: 'users' },
    { name: 'Total Agents', value: data?.totalAgent , type: 'agents' },
    { name: 'Total Transactions', value: data?.totalTransaction , type: 'transactions' },
    { name: 'Total Cash In', value: data?.totalCashIn , type: 'cash_in' },
    { name: 'Total Cash Out', value: data?.totalCashOut , type: 'cash_out' },
    { name: 'Total Send Money', value: data?.totalSendMoney , type: 'send_money' },
    { name: 'Total Cash In Request', value: data?.totalCashInRequest , type: 'cash_in_request' },
    // { name: 'Total Cash Out Request', value: data?.totalCashOutRequest, type: 'cash_out_request' },
    { name: 'Total Cash In Accept', value: data?.totalCashInAccept , type: 'cash_in_accept' },
    { name: 'Total Cash In Reject', value: data?.totalCashInReject , type: 'cash_in_reject' },
    // { name: 'Total Cash Out Reject', value: data?.totalCashOutReject , type: 'cash_out_reject' },
    // { name: 'Total Cash Out Success', value: data?.totalCashOutSuccess , type: 'cash_out_success' },
    // { name: 'Total Send Money Success', value: data?.totalSendMoneySuccess , type: 'send_money_success' },
    {name: 'Deducted amount', value: `${data?.totalDeducted} Tk`},
    {name: 'Total Amount', value: `${data?.totalAmount} Tk`}
  ];

  return (
    <div className="grid grid-cols-3 gap-10 min-h-screen">
      {info.map((item, index) => {
        return <div key={index} className="col-span-1">
        <SystemCard  name={item.name} value={item.value} type={item.type} bgColor={getRandomColor()} />
        </div>
      })}
    </div>
  );
};

export default SystemMonitor;
