


const SystemCard = ({name, value, type, bgColor}) => {
  return (
    <div className={`${bgColor} bg-red-600 p-5 h-full cursor-pointer hover:bg-white`}>
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-xl">{value}</p>
    </div>
  )
}

export default SystemCard