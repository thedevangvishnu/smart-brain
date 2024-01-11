import React from "react";
import Logo from "../../assets/puzzle_4236747.png";

const Navigation = ({ signedIn, onSignOut }) => {
  return (
    <nav className="w-full h-16 flex justify-between  items-center px-4 py-2 shadow-lg ">
      <div className="w-16 h-16 p-4">
        <img src={Logo} alt="Logo for the app" className="" />
      </div>
      {signedIn === true ? (
        <h3 className="cursor-pointer" onClick={() => onSignOut("signIn")}>
          Sign out
        </h3>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Navigation;
