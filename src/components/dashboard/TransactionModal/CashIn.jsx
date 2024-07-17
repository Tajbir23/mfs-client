import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const CashIn = ({ handleModal}) => {
  const axiosSecure = useAxiosSecure();
  const requestCashIn = async(e) => {
    e.preventDefault();
    const amount = e.target.amount.value;
    try {
      const res = await axiosSecure.post('/request_cash_in', { amount })
      const data = await res.data
      if(data?.message){
        toast.success(data?.message)
        handleModal(false)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }
  return (
    <div className="h-screen">
      <form onSubmit={requestCashIn} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-10 bg-opacity-20 flex flex-col space-y-3  bg-black rounded-md">
        <h1 className="text-xl font-bold">Cash In</h1>
        <input className="px-3 py-2 rounded-xl" id="amount" type="number" required placeholder="Enter amount" />
        <button className="px-3 py-2 font-semibold bg-green-700 rounded-xl hover:bg-transparent hover:border border-black" type="submit">Cash In Request</button>
        <button onClick={() => handleModal(false)} className="px-3 py-2 font-semibold bg-red-700 rounded-xl hover:bg-transparent hover:border border-black" type="submit">Close</button>
      </form>
    </div>
  )
}

export default CashIn