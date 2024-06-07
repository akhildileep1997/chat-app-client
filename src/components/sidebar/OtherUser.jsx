import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../../redux/slice/userSlice';

const OtherUser = ({ user }) => {

  //for store
  const dispatch = useDispatch();
  const { selectedUser,onlineUsers } = useSelector(store => store.user)
  
  const isUserOnline = onlineUsers.includes(user._id)
  // for selecting a user
  const selectedUserVerify = (user) => {
    console.log(user, "from selected");
    dispatch(setSelectedUser(user))
  };
  return (
    <>
      <div
        onClick={() => selectedUserVerify(user)}
        className={`${
          selectedUser && selectedUser?._id === user._id
            ? "bg-sky-500 text-white"
            : ""
        } flex  gap-2 items-center text-black hover:bg-sky-500 hover:text-white  rounded-lg p-3 cursor-pointer`}
      >
        <div
          className={`w-12 rounded-full avatar ${isUserOnline ? "online" : ""}`}
        >
          <div className="">
            <img src={user?.profilePic} alt="" />
          </div>
        </div>
        <div className="flex flex-1">
          <div>
            <p>{user?.userName}</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
}

export default OtherUser