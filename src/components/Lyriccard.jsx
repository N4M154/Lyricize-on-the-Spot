import React from "react";
import { BsSpotify } from "react-icons/bs";

const LyricCard = ({ songTitle, artist, albumArt, lyrics }) => {
  return (
    <div className="p-6 rounded-lg shadow-md shadow-gray-900">
      <div className="flex items-center space-x-4">
        <img
          className="w-12 h-12 rounded-lg"
          src={albumArt}
          alt="Album cover"
        />
        <div>
          <p className="font-semibold text-lg">{songTitle}</p>
          <p className="text-sm">{artist}</p>
        </div>
      </div>
      <div className="mt-4 max-h-60 overflow-auto space-y-3">
        {lyrics.length > 0 ? (
          lyrics.map((line, index) => (
            <p key={index} className="font-medium break-words">
              {line}
            </p>
          ))
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
