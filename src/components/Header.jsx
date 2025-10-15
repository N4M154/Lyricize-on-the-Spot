import React from "react";
import icon from "../../public/3.png";

const Header = () => {
  return (
    <header className="relative bg-green-600 backdrop-blur border-b border-white/20 text-white py-5 font-bold font-spotify">
      <div className="flex items-center justify-center space-x-3">
        <img src={icon} alt="Icon" className="w-10 h-10" />
        <div className="font-sans text-2xl sm:text-3xl">
          Lyricize on the Spot!
        </div>
      </div>
    </header>
  );
};

export default Header;
