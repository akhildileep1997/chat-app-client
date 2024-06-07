import React, { useEffect, useState } from "react";
import OtherUser from "./OtherUser";


const AllUsers = ({ users }) => {

  return (
    <>
      {users &&
        users?.map((user) => (
          <div className="overflow-auto">
            <OtherUser key={user._id} user={user} />
          </div>
        ))}
    </>
  );
};

export default AllUsers;
