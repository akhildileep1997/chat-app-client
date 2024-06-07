import React, { useEffect } from "react";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { base_url } from "../../backend_connection/base_url";
import { setMessages } from "../../redux/slice/messageSlice";
import GetRealtimeChat from "../../hooks/GetRealtimeChat";

const Messages = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);
  GetRealtimeChat();
  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        if (selectedUser && selectedUser._id) {
          const id = selectedUser._id;
          const response = await axios.get(`${base_url}/message/get/${id}`, {
            withCredentials: true,
          });
          if (response && response.data && Array.isArray(response.data.chat)) {
            dispatch(setMessages(response.data.chat));
          } else {
            console.error("Invalid response structure", response);
            dispatch(setMessages([])); // Ensure the state is an array even on error
          }
        }
      } catch (error) {
        console.error("Failed to fetch messages", error);
        dispatch(setMessages([])); // Ensure the state is an array even on error
      }
    };

    fetchAllMessages();
  }, [selectedUser, dispatch]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {(messages || []).map((message) => (
        <Message key={message._id} message={message} />
      ))}
    </div>
  );
};

export default Messages;
