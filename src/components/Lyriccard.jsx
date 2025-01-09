import React from "react";
import { BsSpotify } from "react-icons/bs";

const LyricCard = ({ songTitle, artist, albumArt, lyrics }) => {
  return (
    <div className="p-6 rounded-lg shadow-[0_10px_40px_rgba(0,0,0)]">
      <div className="flex items-center space-x-4">
        <img
          className="w-12 h-12 rounded-lg"
          src={albumArt}
          alt="Album cover"
        />
        <div>
          <p
            className="font-light text-md"
            style={{ fontFamily: "'CircularStd2', Arial, sans-serif" }}
          >
            {songTitle}
          </p>
          <p
            className="text-xs"
            style={{ fontFamily: "'CircularStd2', Arial, sans-serif" }}
          >
            {artist}
          </p>
        </div>
      </div>
      <div className="mt-10 max-h-60 overflow-auto space-y-3">
        {lyrics.length > 0 ? (
          lyrics.map((line, index) => (
            <p
              key={index}
              className="font-medium break-words text-lg"
              style={{ fontFamily: "'CircularStd', Arial, sans-serif" }}
            >
              {line}
            </p>
          ))
        ) : (
          <p
            className="text-center text-gray-400"
            style={{ fontFamily: "'CircularStd', Arial, sans-serif" }}
          >
            No lyrics available
          </p>
        )}
      </div>
      <div className="flex items-center mt-6 text-sm space-x-1">
        <BsSpotify />
        <span
          className="font-semibold"
          style={{ fontFamily: "'CircularStd', Arial, sans-serif" }}
        >
          Spotify
        </span>
      </div>
    </div>
  );
};

export default LyricCard;
