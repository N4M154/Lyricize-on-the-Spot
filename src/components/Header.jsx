import React from "react";
import icon from "../../public/3.png";

const Header = () => {
  return (
    <header className="relative bg-green-500 text-white py-5 text-2xl font-bold shadow-xl shadow-gray-900">
      <div className="flex items-center justify-center space-x-4">
        <img src={icon} alt="Icon" className="w-10 h-10 " />
        <div className="font-sans text-4xl text-black">
          Lyricize on the Spot!
        </div>
      </div>
    </header>
  );
};

export default Header;
