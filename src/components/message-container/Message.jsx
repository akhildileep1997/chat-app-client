import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  //from store
  const { authUser, selectedUser } = useSelector(store => store.user)


 
  //gor scroll purpose
  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div
      ref={scroll}
      className={`chat ${
        authUser?._id === message.senderId ? "chat-end" : "chat-start"
      }`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Avatar"
            src={`${authUser?._id===message.senderId?authUser?.profilePic:selectedUser?.profilePic}`}
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-50">12:45</time>
      </div>
      <div className={`chat-bubble ${authUser?._id===message?.senderId?'bg-sky-500 ':'bg-gray-500'}`}>{message && message?.message}</div>
    </div>
  );
};

export default Message;
