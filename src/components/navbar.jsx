import React, { useEffect, useState } from "react";

const Navbar = () => {

  const [userName, setUserName] = useState("");


  useEffect(() => {
    let name = localStorage.getItem("userName");
    setUserName(name)
  }, [])

  return (
    <nav className="flex justify-end items-center  bg-white shadow-md px-8 py-4 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-medium text-gray-800">{userName}</h2>
        <img
          src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg?semt=ais_hybrid&w=740&q=80"
          alt="Profile"
          className="w-11 h-11 rounded-full border border-gray-300 shadow-sm"
        />
      </div>
    </nav>
  );
};

export default Navbar;
