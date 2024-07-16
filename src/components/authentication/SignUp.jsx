import { useContext, useRef, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthContext";
import toast from "react-hot-toast";

const SignUp = () => {
  const inputsRef = useRef([]);
  const [role, setRole] = useState("user")
  const {setUser} = useContext(AuthContext);

  const navigate = useNavigate()

  const axiosPublic = useAxiosPublic()

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
    const pin = inputsRef.current.map((input) => input.value).join("");
    const formData = e.target
    const name = formData.name.value
    const email = formData.email.value
    const phone = formData.phone.value

    const user =  {
      name,
      email,
      phone,
      pin,
      role
    }


    const res = await axiosPublic.post("/signup", user)
    const data = await res.data
    if(data?.token){
        localStorage.setItem("token", data.token)
        setUser(data)
        toast.success("Account created successfully")
        navigate("/dashboard")
    }
    if(data?.error){
        alert(data.error)
        toast.error(data.error)
    }
  };
  return (
    <div className="flex flex-col h-screen justify-center m-auto max-w-md p-6 rounded-md sm:p-10 ">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Registration</h1>
        <p className="text-sm dark:text-gray-600">
           Register as {role}
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
            <label htmlFor="name" className="block mb-2 text-sm">
              Enter your name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="leroy@jenkins.com"
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm">
              Email address
            </label>
            <input
              type="number"
              name="phone"
              id="phone"
              placeholder="Enter your phone number"
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
                    maxLength={1}
                    pattern="[0-9]"
                    ref={(el) => (inputsRef.current[index] = el)}
                    className="block w-9 h-9 py-3 text-sm font-extrabold text-center ring rounded-lg focus:ring-primary-500 focus:border-primary-500 "
                    onKeyUp={(e) => focusNextInput(e, index)}
                    required
                  />
                </div>
              ))}
            </div>
            <p>Enter 5 digit pin</p>
          </div>
        </div>
        <div>
          <div>
            <button
              type="submit"
              className="w-full px-8 py-3 font-semibold rounded-md bg-violet-600 "
            >
              Register
            </button>
          </div>
        </div>
      </form>
      {role === "user" && <h1 className="text-green-700 cursor-pointer" onClick={() => setRole('agent')}>Register as agent</h1>}
      {role === "agent" && <h1 className="text-green-700 cursor-pointer" onClick={() => setRole('user')}>Register as User</h1>}
    </div>
  );
};

export default SignUp;
