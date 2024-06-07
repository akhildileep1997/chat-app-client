import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setSocket } from "./redux/slice/socketSlice";
import { setOnlineUsers } from "./redux/slice/userSlice";


function App() {
  // protected route purpose
  // from store
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);

  // for socket purpose
  useEffect(() => {
    if (authUser) {
      const newSocket = io("http://localhost:5000", {
        query: {
          userId: authUser?._id,
        },
      });
      dispatch(setSocket(newSocket));

      newSocket.on("getOnlineUsers", (onlineUsers) => {
        // here setting data from socket to redux store
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => {
        if (newSocket) {
          newSocket.close();
        }
      };
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser, dispatch]);

  return (
    <div className="App p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
