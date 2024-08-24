import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const [showCover, setShowCover] = useState(true);

  const handleCoverClick = () => {
    setShowCover(false);
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
