import React from 'react'
function LoadingSpinner() {
  return (
    <div style={{
        height: "70vh",
        display: "flex",
        alignItems: "center",
      justifyContent: "center"
        }}>
    <div class="loader">
                <div class="face"></div>
                <div class="face"></div>
                <div class="face"></div>
                <div class="face"></div>
            </div>
            </div>
  )
}
export default LoadingSpinner