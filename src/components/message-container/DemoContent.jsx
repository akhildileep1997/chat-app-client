import React from 'react'
import { useSelector } from 'react-redux';
import { IoMdChatboxes } from "react-icons/io";

const DemoContent = () => {
     const { authUser } = useSelector((store) => store.user);
  return (
    <div className="  text-gray-500 flex flex-col items-center justify-center h-screen w-full sm:min-w-[400px] md:min-w-[600px] lg:min-w-[800px]">
      <h1 className='text-8xl'><IoMdChatboxes /></h1>
      <h1 className='text-5xl font-bold'>Hello {authUser && authUser?.userName} ...!</h1>
      <p className='text-2xl'>Lets start a conversation....</p>
    </div>
  );
}

export default DemoContent