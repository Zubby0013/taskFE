import React from "react";

const Header = () => {
  return (
    <div className=" w-full h-[70px] bg-slate-400 flex justify-between items-center px-3">
      <div className=" font-medium text-lg">Personal Task Management</div>
      <div className=" w-12 h-12 rounded-full bg-blue-950 cursor-pointer"></div>
    </div>
  );
};

export default Header;
