import React from 'react'

interface IProps {
   src: string
   size: string
}

const Avatar = ({ src, size }: IProps) => {
   return (
      <img src={src} alt="Avatar" className={`avatar ${size}-avatar`} />
   )
}

export default Avatar