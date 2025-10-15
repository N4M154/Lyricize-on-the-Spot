import React from "react";
import { BsSpotify } from "react-icons/bs";

const LyricCard = ({ songTitle, artist, albumArt, lyrics }) => {
  return (
    <div className="p-6 rounded-lg shadow-[0_5px_30px_rgba(0,0,0,0.5)] font-spotify">
      <div className="flex items-center space-x-4">
        <img
          className="w-12 h-12 rounded-lg"
          src={albumArt}
          alt="Album cover"
        />
        <div>
          <p className="font-bold text-base md:text-md tracking-tight">{songTitle}</p>
          <p className="text-[11px] uppercase opacity-80 tracking-wide">{artist}</p>
        </div>
      </div>
      <div className="mt-10 max-h-60 overflow-auto">
        {lyrics.length > 0 ? (
          <div className="font-semibold break-words text-xl md:text-lg leading-snug tracking-tight whitespace-pre-wrap">
            {lyrics.join("\n")}
          </div>
        ) : (
          <p className="text-center text-gray-400">No lyrics available</p>
        )}
      </div>
      <div className="flex items-center mt-6 text-sm space-x-1">
        <BsSpotify />
        <span className="font-semibold">Spotify</span>
      </div>
    </div>
  );
};

export default LyricCard;
