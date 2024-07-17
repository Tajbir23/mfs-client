import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthContext";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";


const CashOut = ({handleModal}) => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient()

    const requestCashOut = async(e) => {
        e.preventDefault();
        const amount = Number(e.target.amount.value);
        const pin = e.target.pin.value;
        const agent = e.target.agent.value;
        if(amount > user.balance){
            toast.error("Insufficient Balance")
            return
        }

        try {
            const res = await axiosSecure.post('/request_cash_out', { amount, pin, agent })
            const data = await res.data
            if(data?.message){
                toast.success(data?.message)
                queryClient.invalidateQueries("protect")
                handleModal(false)
              }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
  return (
    <div className="h-screen">
      <form onSubmit={requestCashOut} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-10 bg-opacity-20 flex flex-col space-y-3  bg-black rounded-md">
        <h1 className="text-xl font-bold">Cash Out</h1>
        <input className="px-3 py-2 rounded-xl" id="pin" type="number" placeholder="Enter Your PIN" />
        <input className="px-3 py-2 rounded-xl" id="agent" type="number" placeholder="Enter agent phone number" />
        <input className="px-3 py-2 rounded-xl" id="amount" type="number" placeholder="Enter amount" />
        <button className="px-3 py-2 font-semibold bg-green-700 rounded-xl hover:bg-transparent hover:border border-black" type="submit">Cash Out Request</button>
        <button onClick={() => handleModal(false)} className="px-3 py-2 font-semibold bg-red-700 rounded-xl hover:bg-transparent hover:border border-black" type="submit">Close</button>
      </form>
    </div>
  )
}

export default CashOut