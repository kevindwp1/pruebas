import React, { useState } from 'react'
import { ExpandMore, Style } from '@material-ui/icons'

function OpcionsMsg() {

  const [isActive, setIsActive] = useState(false)
  return (
    <>
      <div className='opcionesButton'
        onClick={() => {
          setIsActive(!isActive)
        }}
      >
        <ExpandMore />
      </div>

      <div className='opciones'
        style={isActive ? { display: '' } : { display: 'none' }}
      >
        <div >Eliminar mensaje</div>
        <div >Traducir mensaje</div>
      </div>

    </>
  )
}

export default OpcionsMsg