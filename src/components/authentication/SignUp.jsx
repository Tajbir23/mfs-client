import { useRef, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  const inputsRef = useRef([]);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

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
    const formData = e.target;
    const name = formData.name.value;
    const email = formData.email.value;
    const phone = formData.phone.value;

    const user = {
      name,
      email,
      phone,
      pin,
      role,
    };

    console.log(user);
    try {
      const res = await axiosPublic.post("/signup", user);
      const data = await res.data;
      if (data) {
        toast.success(data?.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center m-auto max-w-lg p-8 rounded-lg shadow-lg bg-white">
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold text-gray-800">Sign Up</h1>
        <p className="text-lg text-gray-500 mt-2">
          Join us as a {role}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-1 text-lg font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 text-lg font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-1 text-lg font-medium">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              required
              placeholder="Your phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <p className="text-lg font-medium">Enter 5-digit PIN</p>
            <div className="flex mt-3 space-x-3">
              {[...Array(5)].map((_, index) => (
                <div key={index}>
                  <input
                    type="text"
                    id={`code-${index + 1}`}
                    maxLength={1}
                    pattern="[0-9]"
                    ref={(el) => (inputsRef.current[index] = el)}
                    className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                    onKeyUp={(e) => focusNextInput(e, index)}
                    required
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white bg-violet-600 rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            Register
          </button>
        </div>
      </form>
      <div className="mt-6 text-center">
        {role === "user" ? (
          <p
            className="text-violet-600 cursor-pointer hover:underline"
            onClick={() => setRole("agent")}
          >
            Register as an agent
          </p>
        ) : (
          <p
            className="text-violet-600 cursor-pointer hover:underline"
            onClick={() => setRole("user")}
          >
            Register as a user
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
