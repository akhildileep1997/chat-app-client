import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { base_url } from '../backend_connection/base_url';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { setAuthUser } from '../redux/slice/userSlice';

const Login = () => {
  //for storing value to redux store
  const dispatch = useDispatch();
  //for navigation
  const navigate = useNavigate();
  //state for getting all inputs
  const [inputs, setInputs] = useState({
    userName: "",
    password: "",
  });
  //for taking values from input
  const inputsHandleChange = (e) => {
    setInputs((prev) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };
  //
  const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
          if(!inputs.userName || !inputs.password) {
            toast.error("please enter username and password");
            return;
          }
          const response = await axios.post(
            `${base_url}/auth/login`,
            {
              userName: inputs.userName,
              password: inputs.password,
            },
            {
              withCredentials: true,
            }
          );
          if (response) {
            toast.success(response.data.message);
            dispatch(setAuthUser(response.data.user))
            localStorage.setItem('txYprsfgh',response.data.user._id)
            navigate("/");
          }
        } catch (error) {
          console.log(error.message);
          toast.error(error.response.data.message);
        }
        setInputs({
          userName: "",
          password: "",
        });
  }
  return (
    <div className="min-w-96 mx-auto">
      <div className="h-full p-6 w-full bg-gray-100 rounded-md border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-sky-500">Login</h1>
        <form onSubmit={handleLoginSubmit}>
          <div className="mt-3">
            <label className="label p-2 ">
              <span className="text-base label-text text-sky-500">
                User-Name
              </span>
            </label>
            <input
              onChange={inputsHandleChange}
              className="w-full input input-bordered h-10"
              type="text"
              name="userName"
              value={inputs.fullName}
              placeholder="john"
            />
          </div>
          <div className="mt-3">
            <label className="label p-2 ">
              <span className="text-base label-text text-sky-500">
                Password
              </span>
            </label>
            <input
              onChange={inputsHandleChange}
              className="w-full input input-bordered h-10"
              type="password"
              name="password"
              value={inputs.password}
              placeholder="enter password"
            />
          </div>
          <div className="mt-3 text-center">
            <span className="text-sky-500 ">
              New here ?{" "}
              <Link to={"/sign-up"} className="font-bold text-gray-500 ">
                register here
              </Link>{" "}
            </span>
          </div>
          <div className="mt-3 flex justify-center">
            <button type='submit' className="btn btn-block btn-sm h-10 bg-sky-600 text-white hover:text-sky-500 bg-gray-400">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login