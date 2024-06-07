import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import MessageContainer from '../components/message-container/MessageContainer'

const Home = () => {
  return (
    <div className="flex h-[90vh]  rounded-2xl overflow-hidden">
      <div className=" h-full">
        <Sidebar />
      </div>
      <div className=" h-full bg-gray-200">
        <MessageContainer />
      </div>
    </div>
  );
}

export default Home