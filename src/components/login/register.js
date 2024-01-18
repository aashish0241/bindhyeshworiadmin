import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.status) {
        localStorage.setItem("isLogin", "true");
        toast.success("Registration successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Registration failed!");
        console.error("Registration failed");
      }
    } catch (error) {
      toast.error("Registration failed!");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="container mx-auto bg-gray-400 px-6 py-24 sm:py-32">
      <ToastContainer />
      <form className="mx-auto mt-8 max-w-xl">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Register Of Admin
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Register for your account.
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-900">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              autoComplete="given-name"
              className="block w-full rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-900">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="block w-full rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="sm:col-span-2 flex items-center">
            <label htmlFor="agreed" className="ml-2 text-sm text-gray-600">
              I agree to the{" "}
              <a href="/" className="font-semibold text-indigo-600">
                privacy policy
              </a>
            </label>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="button"
            onClick={handleRegister}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus-visible:ring focus-visible:ring-indigo-600 focus-visible:border-indigo-600"
          >
            Register User
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
