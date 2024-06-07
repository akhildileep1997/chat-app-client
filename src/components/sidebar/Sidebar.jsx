import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import AllUsers from "./AllUsers";
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import axios from "axios";
import { base_url } from "../../backend_connection/base_url";
import { useDispatch,} from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from "../../redux/slice/userSlice";
import {setSocket} from '../../redux/slice/socketSlice'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  //for store
  const dispatch = useDispatch();
  //for storing users state
  const [users, setUsers] = useState([]);
  //for searching purpose
  const [searchKey, setSearchKey] = useState("");
  const [duplicateUsers, setDuplicateUsers] = useState([]);
  const filterBySearch = (e) => {
    e.preventDefault();
    const filterRooms = duplicateUsers?.filter((user) =>
      user.userName.toLowerCase().includes(searchKey.toLowerCase())
    );
    if (filterRooms) {
          setUsers(filterRooms);
    }
  };

  //calling the api for get all users
  useEffect(() => {
    const getAllUsers = async (req, res) => {
      try {
        const response = await axios.get(`${base_url}/user`, {
          withCredentials: true,
        });
        if (response) {
          dispatch(setOtherUsers(response.data.users));
          setUsers(response.data.users);
          setDuplicateUsers(response.data.users);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);

  //logic for log-out
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.post(`${base_url}/auth/log-out`, {
        withCredentials: true,
      });
      if (response) {
        localStorage.clear();
        dispatch(setAuthUser(null));
        dispatch(setOtherUsers([]));
        dispatch(setSelectedUser(null));
        dispatch(setSocket(null))
        navigate("/login");
        toast.success(response.data.message);
      }
    } catch (error) {}
  };

  return (
    <div className="border border-gray-400 p-4 flex flex-col h-full bg-gray-200">
      <form onSubmit={filterBySearch} className="flex items-center gap-1 mb-4">
        <input
          onKeyUp={filterBySearch}
          onChange={(e) => setSearchKey(e.target.value)}
          value={searchKey || ""}
          placeholder="search here"
          className="input input-bordered rounded-full"
          type="text"
        />
        <button  className="btn btn-circle bg-sky-500 text-white" type="submit">
          <FaSearch className="w-5 h-6 outline-none" />
        </button>
      </form>
      <div className="divider mb-4"></div>

      <div className="flex-grow overflow-auto">
        <AllUsers users={users} />
      </div>

      <div className="flex justify-between mt-5">
        <button
          onClick={handleLogout}
          className="btn btn-sm bg-red-400 text-white hover:bg-red-600 hover:text-white"
        >
          <RiLogoutCircleLine />
        </button>
        <button className="btn btn-sm bg-sky-500 text-white hover:text-white hover:bg-sky-600">
          <MdModeEdit />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
