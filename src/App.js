import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import BloomCanvas from "./components/BloomCanvas";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import DoodleModal from "./components/DoodleModal";
import DoodleFab from "./components/DoodleFab";
import Home from "./pages/Home";
import Writing from "./pages/Writing";
import Article from "./pages/Article";

export default function App() {
  const [doodleOpen, setDoodleOpen] = useState(false);

  return (
    <div className="min-h-screen w-full text-ink font-sans font-light">
      <BloomCanvas />
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/writing/:slug" element={<Article />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <DoodleFab onOpen={() => setDoodleOpen(true)} />
      <DoodleModal open={doodleOpen} onClose={() => setDoodleOpen(false)} />
      <Analytics />
    </div>
  );
}
