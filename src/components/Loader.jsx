import React from 'react'

const Loader = ({ show }) => {
  return (
    show && (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    )
  )
}

export default Loader
