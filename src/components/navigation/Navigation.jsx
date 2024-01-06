import React from "react";
import Logo from "../../assets/puzzle_4236747.png";

const Navigation = () => {
  return (
    <nav className="w-full h-16 flex justify-between  items-center px-4 py-2 shadow-md fixed top-0 ">
      <div className="w-16 h-16 p-4">
        <img src={Logo} alt="Logo for the app" className="" />
      </div>
      <h3 className="cursor-pointer">Sign out</h3>
    </nav>
  );
};

export default Navigation;
