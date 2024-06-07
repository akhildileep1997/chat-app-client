import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast'
import axios from "axios";
import { base_url } from "../../backend_connection/base_url";
import { setMessages } from "../../redux/slice/messageSlice";

const SendMessage = () => {

  //from store
  const { selectedUser } = useSelector(store => store.user)
  const { messages } = useSelector(store => store.message)
  console.log(messages);
  const dispatch = useDispatch()
  //getting input value
  const [message,setMessage] = useState("")

  // calling api for sending message
  const HandleSendMessage = async (e) => {
    e.preventDefault();
    if (selectedUser) {
      const id = selectedUser?._id
      try {
        if (!message) {
          toast.error('please type something to send')
          return
            }
            const response = await axios.post(
              `${base_url}/message/send/${id}`,{message},
              {
                withCredentials: true,
              }
            );
            if (response) {
              // toast.success(response.data.message)
              dispatch(setMessages([...messages, response?.data?.chat]));
            }
          } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
      }
      setMessage("");
  }
  }
  

  return (
    <form onSubmit={HandleSendMessage} className="px-4 my-3 mt-auto">
      <div className="w-full relative">
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message || ""}
          className="border text-md rounded-lg block w-full bg-gray-100 text-black p-3 h-10 border-sky-400"
          placeholder="type message ..."
          type="text"
              />
              <button type="submit" className="absolute flex inset-y-0 end-0 text-white bg-sky-500 p-3 items-center rounded-lg ">
                  <IoSend />
              </button>
      </div>
    </form>
  );
};

export default SendMessage;
