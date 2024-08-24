import React, { useState, useRef } from "react";
import axios from "axios";
import download from "downloadjs";
import { toPng } from "html-to-image";
import ColorPicker from "./ColorPicker";
import LyricCard from "./Lyriccard";
import { HiRefresh } from "react-icons/hi";

const SPOTIFY_CLIENT_ID = import.meta.env.VITE_CLIENT_ID; //from spotify developer mode
const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

const Hero = () => {
  const [songLink, setSongLink] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [albumArt, setAlbumArt] = useState("");
  const [lyrics, setLyrics] = useState([]);
  const [cardBgColor1, setCardBgColor1] = useState("#000000");
  const [cardBgColor2, setCardBgColor2] = useState("#4B17AB");
  const [textColor, setTextColor] = useState("#FFFA75");
  const [trackId, setTrackId] = useState("");
  const [loading, setLoading] = useState(false);
  const cardRef = useRef(null);

  const fetchSpotifyData = async () => {
    const extractedTrackId = songLink.split("/").pop().split("?")[0];
    setTrackId(extractedTrackId);
    setLoading(true);

    try {
      const tokenResponse = await axios.post(
        "https://accounts.spotify.com/api/token",
        "grant_type=client_credentials",
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`),
          },
        }
      );

      const token = tokenResponse.data.access_token;

      const trackResponse = await axios.get(
        `https://api.spotify.com/v1/tracks/${extractedTrackId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const track = trackResponse.data;
      setSongTitle(track.name);
      setArtist(track.artists.map((artist) => artist.name).join(", "));
      setAlbumArt(track.album.images[0].url);
    } catch (error) {
      console.error("Error fetching Spotify data:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadCard = () => {
    if (cardRef.current === null) {
      return;
    }
    toPng(cardRef.current, {
      backgroundColor: "transparent",
    })
      .then((dataUrl) => {
        download(dataUrl, `${songTitle + " lyric-card"}.png`);
      })
      .catch((err) => {
        console.error("Error generating image:", err);
      });
  };

  const handleRefresh = () => {
    setSongLink("");
    setSongTitle("");
    setArtist("");
    setAlbumArt("");
    setLyrics([]);
    setTrackId("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-500 to-black text-white p-5">
      <div className="flex w-full max-w-5xl space-x-8">
        <div className="flex-1 space-y-6">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Enter Spotify song link"
              value={songLink}
              onChange={(e) => setSongLink(e.target.value)}
              className="p-3 rounded-lg shadow-md bg-green-900 text-white w-full border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <button
              onClick={fetchSpotifyData}
              className="p-4 rounded-full shadow-md bg-black text-white font-bold hover:bg-white hover:text-black transition duration-200"
            >
              GO!
            </button>
            <button
              onClick={handleRefresh}
              className="p-4 rounded-full shadow-md bg-black text-green-500 font-semibold hover:bg-green-300 hover:text-black transition duration-200 text-2xl"
            >
              <HiRefresh />
            </button>
          </div>
          <div>
            <textarea
              placeholder="Enter lyrics here, each line on a new row..."
              value={lyrics.join("\n")}
              onChange={(e) => setLyrics(e.target.value.split("\n"))}
              className="p-3 rounded-md border border-green-600 bg-green-900  text-white w-full h-40 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div>
            <div
              ref={cardRef}
              style={{
                background: `linear-gradient(to bottom, ${cardBgColor1}, ${cardBgColor2})`,
                color: textColor,
                maxWidth: "370px",
              }}
              className="p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
            >
              <LyricCard
                songTitle={songTitle}
                artist={artist}
                albumArt={albumArt}
                lyrics={lyrics}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={downloadCard}
              className="mt-4 p-4 mr-40 rounded-lg shadow-md bg-violet-800 text-white font-semibold hover:bg-violet-400 hover:text-violet-800 transition duration-300"
            >
              Download png
            </button>
          </div>
        </div>

        {/* Color stuff */}

        <div className="flex-1 flex flex-col space-y-6 p-4 rounded-3xl shadow-lg bg-gradient-to-b from-green-700 to-black shadow-green-700">
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <h3 className="text-lg mb-2 text-black font-semibold">
                  1st Gradient Color:
                </h3>
                <ColorPicker color={cardBgColor1} onChange={setCardBgColor1} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg mb-2 text-black font-semibold">
                  2nd Gradient Color:
                </h3>
                <ColorPicker color={cardBgColor2} onChange={setCardBgColor2} />
              </div>
            </div>
            <div>
              <h3 className="text-lg mb-2 text-black font-semibold">
                Text Color:
              </h3>
              <ColorPicker color={textColor} onChange={setTextColor} />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-green-700 font-semibold">
                Loading music player...
              </p>
            </div>
          ) : trackId ? (
            <div className="mt-4">
              <iframe
                src={`https://open.spotify.com/embed/track/${trackId}`}
                width="100%"
                height="300"
                frameBorder="0"
                allow="encrypted-media"
                title="Spotify Player"
                className="rounded-lg shadow-md transform transition duration-300 hover:scale-105"
              ></iframe>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-green-700 font-semibold">
                Enter a song link and fetch details to see the player here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
