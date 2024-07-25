import { useNavigate } from "react-router-dom"



const SystemCard = ({name, value, type, bgColor}) => {
    const navigate = useNavigate()
    const handleDetails = (data) => {
        navigate(`/dashboard/details/${data}/${name}`)
    }
  return (
    <div onClick={() => type && handleDetails(type)} className={`${bgColor} bg-red-600 p-5 h-full cursor-pointer hover:bg-white`}>
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-xl">{value}</p>
    </div>
  )
}

export default SystemCard