import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/slice/messageSlice";
import { useEffect } from "react";

const GetRealtimeChat = () => {
  const dispatch = useDispatch();
  const { socket } = useSelector((store) => store.socket);
  const { messages } = useSelector((store) => store.message);

  useEffect(() => {
    if (socket) {
      const handleNewMessage = (newMessage) => {
        dispatch(setMessages([...messages, newMessage]));
      };

      socket.on("newMessage", handleNewMessage);
      return () => {
        socket.off("newMessage", handleNewMessage);
      };
    }
  }, [socket, dispatch, messages]);
};

export default GetRealtimeChat;
