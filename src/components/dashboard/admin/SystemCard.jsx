import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const SystemCard = ({ name, value, type, bgColor }) => {
  const navigate = useNavigate();

  const handleDetails = (data) => {
    navigate(`/dashboard/details/${data}/${name}`);
  };

  return (
    <div
      onClick={() => type && handleDetails(type)}
      className={`${bgColor} p-5 h-full cursor-pointer hover:bg-opacity-75 transition duration-300 ease-in-out transform hover:scale-105 rounded-lg shadow-lg`}
    >
      <h2 className="text-3xl font-bold text-white">{name}</h2>
      <p className="text-2xl text-white mt-2">{value}</p>
    </div>
  );
};

SystemCard.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.string,
  bgColor: PropTypes.string.isRequired,
};

export default SystemCard;