import React from 'react'
import SendMessage from './SendMessage';
import Messages from './Messages';
import { useSelector } from 'react-redux';
import DemoContent from './DemoContent';

const MessageContainer = () => {
  const { selectedUser, onlineUsers, otherUsers } = useSelector((store) => store.user);
  const isUserOnline = onlineUsers?.includes(otherUsers?._id);
  console.log(isUserOnline);
  return (
    <>
      {selectedUser && selectedUser ? (
        <>
          <div className="w-full sm:min-w-[400px] md:min-w-[600px] lg:min-w-[800px] flex flex-col h-full">
            <div className="flex gap-2 items-center text-white bg-sky-400 rounded-sm p-3 cursor-pointer px-4 py-2 mb-2">
              <div className={`w-12 rounded-full avatar ${isUserOnline ? "online" : ""}`}>
                <div className="">
                  <img src={selectedUser && selectedUser?.profilePic} alt="" />
                </div>
              </div>
              <div className="flex flex-1">
                <div>
                  <p className="font-bold ">
                    {selectedUser && selectedUser?.userName}
                  </p>
                </div>
              </div>
            </div>
            <Messages />
            <SendMessage />
          </div>
        </>
      ) : (
        <>
          <DemoContent />
        </>
      )}
    </>
  );
}

export default MessageContainer