import { useRef } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const inputsRef = useRef([]);
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate()

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

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('click')
    const pin = inputsRef.current.map((input) => input.value).join("");
    const text = e.target.text.value
    
    const user =  {
      text,
      pin
    }

    try {
      const res = await axiosPublic.post("/login", user)
      const data = await res.data
      if(data?.token){

        localStorage.setItem("token", data.token)
        navigate("/dashboard")
    }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="flex flex-col h-screen m-auto justify-center max-w-md p-6 rounded-md sm:p-10 ">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Login</h1>
        <p className="text-sm dark:text-gray-600">
           Login your account
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        noValidate=""
        action=""
        className="space-y-12"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="text" className="block mb-2">
              Email or phone
            </label>
            <input
              type="text"
              name="text"
              id="text"
              placeholder="Enter your email or phone"
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
            />
          </div>
          <div>
            <div className="flex mb-2 space-x-2 rtl:space-x-reverse">
              {[...Array(5)].map((_, index) => (
                <div key={index}>
                  <label
                    htmlFor={`code-${index + 1}`}
                    className="sr-only"
                  >{`Code ${index + 1}`}</label>
                  <input
                    type="number"
                    id={`code-${index + 1}`}
                    maxLength="1"
                    ref={(el) => (inputsRef.current[index] = el)}
                    className="block w-9 h-9 py-3 text-sm font-extrabold text-center ring rounded-lg focus:ring-primary-500 focus:border-primary-500 "
                    onKeyUp={(e) => focusNextInput(e, index)}
                    required
                  />
                </div>
              ))}
            </div>
            <p className="text-sm">Enter 5 digit pin</p>
          </div>
        </div>
        <div>
          <div>
            <button
              type="submit"
              className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
