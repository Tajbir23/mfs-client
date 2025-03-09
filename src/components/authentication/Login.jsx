import { useContext, useRef } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const inputsRef = useRef([]);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const focusNextInput = (e, index) => {
    if (e.target.value.length === 0 && index > 0) {
      inputsRef.current[index - 1].focus();
    } else if (
      e.target.value.length > 0 &&
      index < inputsRef.current.length - 1
    ) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pin = inputsRef.current.map((input) => input.value).join("");
    const text = e.target.text.value;

    const user = {
      text,
      pin,
    };

    try {
      const res = await axiosPublic.post("/login", user);

      const data = await res.data;
      if (data?.token) {
        localStorage.setItem("token", data.token);
        setUser(data);
        navigate("/dashboard");
        toast.success("Logged in successfully");
      }
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h1 className="text-3xl font-bold text-center mb-4">Welcome Back!</h1>
        <p className="text-center text-gray-600 mb-6">
          Please login to your account
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
              Email or Phone
            </label>
            <input
              type="text"
              name="text"
              id="text"
              placeholder="Enter your email or phone"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Enter 5-digit PIN</p>
            <div className="flex justify-between mt-2">
              {[...Array(5)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  id={`code-${index + 1}`}
                  maxLength="1"
                  pattern="[0-9]"
                  ref={(el) => (inputsRef.current[index] = el)}
                  className="w-12 h-12 text-center text-lg font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  onKeyUp={(e) => focusNextInput(e, index)}
                  required
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
