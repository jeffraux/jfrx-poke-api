import React from 'react'

const Overlay = () => {
  return (
    <div className="absolute bg-gray-700 opacity-30 top-0 right-0 w-full h-full rounded-md z-0"></div>
  )
}

export default React.memo(Overlay)
