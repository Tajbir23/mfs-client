import { useContext } from "react"
import {AuthContext} from '../../../provider/AuthContext';
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import { useQueryClient } from "@tanstack/react-query";

const SendMoney = ({handleModal}) => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient()

    const handleSendMoney = async(e) => {
        const pin = e.target.pin.value
        const receiver = e.target.receiver.value
        const amount = Number(e.target.amount.value)
        if(amount > user.balance){
            toast.error("Insufficient Balance")
            return
        }

        try {
            const res = await axiosSecure.post('/send_money', {pin, receiver, amount})
            const data = await res.data
            if(data.message){
                toast.success(data.message)
                queryClient.invalidateQueries('protect')
                handleModal(false)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
  return (
    <div className="h-screen">
    <form onSubmit={handleSendMoney} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-10 bg-opacity-20 flex flex-col space-y-3  bg-black rounded-md">
      <h1 className="text-xl font-bold">Send Money</h1>
      <input className="px-3 py-2 rounded-xl" id="pin" required type="number" placeholder="Enter Your PIN" />
      <input className="px-3 py-2 rounded-xl" id="receiver" required type="number" placeholder="Enter receiver phone number" />
      <input className="px-3 py-2 rounded-xl" id="amount" required type="number" placeholder="Enter amount" />
      <button className="px-3 py-2 font-semibold bg-green-700 rounded-xl hover:bg-transparent hover:border border-black" type="submit">Send</button>
      <button onClick={() => handleModal(false)} className="px-3 py-2 font-semibold bg-red-700 rounded-xl hover:bg-transparent hover:border border-black" type="submit">Close</button>
    </form>
  </div>
  )
}

export default SendMoney