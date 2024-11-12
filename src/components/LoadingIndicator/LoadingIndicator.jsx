import React from "react"
import "./LoadingIndicator.css"

export default function LoadingIndicator() {
    return (
      <div className="loading-overlay">
        <span 
          className="loading-spinner"
          role="status"
          aria-label="Loading"
        ></span>
      </div>
    )
}
  


  