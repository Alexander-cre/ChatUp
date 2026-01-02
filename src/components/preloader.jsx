import React from "react"
import "./Preloader.css" // Import the CSS

export default function Preloader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
      <div className="thing">
        <div className="beam r1 r"></div>
        <div className="beam r3 r"></div>
        <div className="beam b1 b"></div>
        <div className="beam b3 b"></div>
      </div>
    </div>
  )
}
