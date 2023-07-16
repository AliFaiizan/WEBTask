import React from 'react'

const Footer = () => {
    let date= new Date().getFullYear();
  return (
    <div>All rights Reserved by OMDB - {date}</div>
  )
}

export default Footer