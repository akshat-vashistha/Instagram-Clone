import React from 'react'

//defining an object
const modal_styles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  padding: '50px',
  zIndex: 1000
}
const overlay_styles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.7)',
  zIndex: 1000
}

function Modal({ open, children, onClose }) {
  if (!open) return null

  return (
    <>
      <div style={overlay_styles} />
      <div style={modal_styles}>
        {children}
        <center>
          <button onClick={onClose}>Close</button>
        </center>
      </div>
    </>
  )
}

export default Modal
