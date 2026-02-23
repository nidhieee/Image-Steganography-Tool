import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import TextToText from './pages/TextToText'
import TextToImage from './pages/TextToImage'
import ImageToImage from './pages/ImageToImage'
import TextToGif from './pages/TextToGif'

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/text-to-text" element={<TextToText />} />
          <Route path="/text-to-image" element={<TextToImage />} />
          <Route path="/image-to-image" element={<ImageToImage />} />
          <Route path="/text-to-gif" element={<TextToGif />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}