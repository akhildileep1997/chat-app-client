import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { base_url } from "../backend_connection/base_url";

const SignUp = () => {
  //for navigation
  const navigate = useNavigate();
  //state for getting all inputs
  const [inputs, setInputs] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  //for taking values from input
  const inputsHandleChange = (e) => {
    setInputs((prev) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };
  //for taking value from checkbox
  const checkBoxHandleChange = (gender) => {
    setInputs({ ...inputs, gender });
  };
  //calling api or submitting details to backend
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!inputs.fullName || !inputs.userName || !inputs.gender || !inputs.password || !inputs.confirmPassword) {
        toast.error('all fields required');
        return;
      }
      if (inputs.password !== inputs.confirmPassword) {
        toast.error('password and confirm-password not matching')
        return;
      }
      const response = await axios.post(
        `${base_url}/auth/sign-up`,
        {
          fullName: inputs.fullName,
          userName: inputs.userName,
          password: inputs.password,
          confirmPassword: inputs.confirmPassword,
          gender: inputs.gender,
        },
        {
          withCredentials: true,
        }
      );
      if (response) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message)
    }
    setInputs({
      fullName: "",
      userName: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  return (
    <div className="min-w-96 mx-auto">
      <div className="h-full p-6 w-full bg-gray-100 rounded-md border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-sky-500">Sign-Up</h1>
        <form onSubmit={handleRegisterSubmit}>
          <div className="mt-3">
            <label className="label p-2 ">
              <span className="text-base label-text text-sky-500">
                Full-Name
              </span>
            </label>
            <input
              onChange={inputsHandleChange}
              className="w-full input input-bordered h-10"
              type="text"
              name="fullName"
              value={inputs.fullName}
              placeholder="john-doe"
            />
          </div>
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
              value={inputs.userName}
              placeholder="john"
            />
          </div>
          <div className="mt-3 text-sky-600 ">
            <label className="label p-2 ">
              <span className="text-base label-text text-sky-500">Gender</span>
            </label>{" "}
            <div className="flex justify-evenly">
              <div className="flex">
                <p className="me-1">male : </p>
                <input
                  checked={inputs.gender === "male"}
                  onChange={() => checkBoxHandleChange("male")}
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-info"
                />
              </div>
              <div className="flex">
                <p className="me-1">female : </p>
                <input
                  checked={inputs.gender === "female"}
                  onChange={() => checkBoxHandleChange("female")}
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-info"
                />
              </div>
            </div>
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
          <div className="mt-3">
            <label className="label p-2 ">
              <span className="text-base label-text text-sky-500">
                Confirm-Password
              </span>
            </label>
            <input
              onChange={inputsHandleChange}
              className="w-full input input-bordered h-10"
              type="text"
              name="confirmPassword"
              value={inputs.confirmPassword}
              placeholder="confirm password"
            />
          </div>
          <div className="mt-3 text-center">
            <span className="text-sky-500 ">
              Already have an account ?{" "}
              <Link to={"/login"} className="font-bold text-gray-500 ">
                login here
              </Link>{" "}
            </span>
          </div>
          <div className="mt-3 flex justify-center">
            <button className="btn btn-block btn-sm h-10 bg-sky-600 text-white hover:text-sky-500 bg-gray-400">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
