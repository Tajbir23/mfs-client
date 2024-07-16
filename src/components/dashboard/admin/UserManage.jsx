import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Button, Table } from "antd";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const UserManage = () => {
    const [search, setSearch] = useState("");
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const {data: userData, isLoading, isError, refetch} = useQuery({
        queryKey: ["users", search],
        queryFn: async () => {
            axiosPublic.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
            const res = await axiosPublic.get(`/manage_user?search=${search}`);
            const user = await res.data;
            return user;
        }
    })

  

    const handleUser = async({role, email, status}) => {
      console.log(role, email, status)
      const res = await axiosSecure.post("/manage_user", {role, email, status})
      const data = await res.data
      if(data?.message){
        refetch()
      }
    }
    
    if(isLoading) return <h1>Loading...</h1>

    if(isError){
        console.log(isError)
    }

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "role",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (text, record) => {
          // console.log(record)
          const {email, role} = record
          if (record.status === "active") {
              if(record.role === "admin"){
                return <Button className="text-green-500" disabled>Active</Button>;
              }else{
                return (
                  <>
                  <Button onClick={() => handleUser({role, email, status: "block"})} className="text-green-500">Block</Button>
                  </>
                );
              }
          } else {
            if(record.status === "block"){
              return <Button onClick={() => handleUser({role, email, status: "active"})} className="text-red-500">Unblock</Button>;
            }else{
              return <Button onClick={() => handleUser({role, email, status: "accept"})} className="text-green-600">Accept</Button>;
            }
            
          }
        }
      },
      
    ]
  return (
    <div>
      <input type="text" className="p-2 border mb-5" onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Search anything..." />
      <Table dataSource={userData} columns={columns} pagination={{ pageSize: 15 }} />
    </div>
  )
}

export default UserManage