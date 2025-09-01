import React from 'react'

export default function Die(props) {
  // console.log(props)
  const { toggleEvent } = props


  return (




    <button
      style={{ backgroundColor: props.isHeld && "lightgreen" }}
      onClick={() => toggleEvent(props.id)}
      className='Die'
      aria-pressed={props.isHeld}
      aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? "held" : "not held"}`}
    >
      {props.value}
    </button>



  )
}
