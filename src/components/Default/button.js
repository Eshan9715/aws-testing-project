import React from 'react'

const Button = ({handleClick, name, color, hoverColor,textColor, hoverTextColor}) => {
  return (
    <button className={` text-${textColor} bg-${color} font-Monserrat py-2 px-6 rounded md:ml-8 hover:bg-${hoverColor}  hover:border-2 border-black hover:text-${hoverTextColor}
    duration-500 max-w-[200px] mt-5  md:mt-2 min-w-[150px]`} onClick={handleClick}>{name}
    </button>
  )
}

export default Button
