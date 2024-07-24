import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../Loading";
import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState } from "react";


import io from 'socket.io-client'
const socket = io('http://localhost:5000')

const SystemMonitor = () => {
  // const queryClient = useQueryClient();
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
    // queryClient.invalidateQueries("systemMonitor")
  })

  const info = [
    
    { name: 'Total Users', value: data?.totalUser },
    { name: 'Total Agents', value: data?.totalAgent },
    { name: 'Total Transactions', value: data?.totalTransaction },
    { name: 'Total Cash In', value: data?.totalCashIn },
    { name: 'Total Cash Out', value: data?.totalCashOut },
    { name: 'Total Send Money', value: data?.totalSendMoney },
    { name: 'Total Cash In Request', value: data?.totalCashInRequest },
    { name: 'Total Cash Out Request', value: data?.totalCashOutRequest },
    { name: 'Total Cash In Accept', value: data?.totalCashInAccept },
    { name: 'Total Cash In Reject', value: data?.totalCashInReject },
    { name: 'Total Cash Out Reject', value: data?.totalCashOutReject },
    { name: 'Total Cash Out Success', value: data?.totalCashOutSuccess },
    { name: 'Total Send Money Success', value: data?.totalSendMoneySuccess },
    
  ];

  return (
    <div className="overflow-y-auto h-screen">
    <section className="p-6 my-6 dark:bg-gray-100 dark:text-gray-800">
	<div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
		
		<div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800">
			<div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="h-9 w-9 dark:text-gray-100">
					<path d="M425.706,142.294A240,240,0,0,0,16,312v88H160V368H48V312c0-114.691,93.309-208,208-208s208,93.309,208,208v56H352v32H496V312A238.432,238.432,0,0,0,425.706,142.294Z"></path>
					<rect width="32" height="32" x="80" y="264"></rect>
					<rect width="32" height="32" x="240" y="128"></rect>
					<rect width="32" height="32" x="136" y="168"></rect>
					<rect width="32" height="32" x="400" y="264"></rect>
					<path d="M297.222,335.1l69.2-144.173-28.85-13.848L268.389,321.214A64.141,64.141,0,1,0,297.222,335.1ZM256,416a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,416Z"></path>
				</svg>
			</div>
			<div className="flex flex-col justify-center align-middle">
				<p className="text-3xl font-semibold leading-none">{data?.totalDeducted} tk</p>
				<p className="capitalize">Deducted amount</p>
			</div>
		</div>
		<div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800">
			<div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="h-9 w-9 dark:text-gray-100">
					<path d="M454.423,278.957,328,243.839v-8.185a116,116,0,1,0-104,0V312H199.582l-18.494-22.6a90.414,90.414,0,0,0-126.43-13.367,20.862,20.862,0,0,0-8.026,33.47L215.084,496H472V302.08A24.067,24.067,0,0,0,454.423,278.957ZM192,132a84,84,0,1,1,136,65.9V132a52,52,0,0,0-104,0v65.9A83.866,83.866,0,0,1,192,132ZM440,464H229.3L79.141,297.75a58.438,58.438,0,0,1,77.181,11.91l28.1,34.34H256V132a20,20,0,0,1,40,0V268.161l144,40Z"></path>
				</svg>
			</div>
			<div className="flex flex-col justify-center align-middle">
				<p className="text-3xl font-semibold leading-none">{data?.totalAmount}tk</p>
				<p className="capitalize">Total Amount</p>
			</div>
		</div>
	</div>
</section>
    <ResponsiveContainer width="100%" height="50%">
      <LineChart
        width="50%"
        height={500}
        data={info}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {info.map((item, index) => (
          <Line key={index} type="monotone" dataKey="value" name={item.name} stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
        ))}
      </LineChart>
    </ResponsiveContainer>
    </div>
  );
};

export default SystemMonitor;
