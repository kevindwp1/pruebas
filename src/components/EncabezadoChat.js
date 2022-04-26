import React from 'react'
import { Avatar } from "@material-ui/core";
import { Notifications, LocationOn, PeopleAlt, Search, Help, Send } from "@material-ui/icons"

function EncabezadoChat({ nombreChat }) {
  const chatVacio = "elige un chat para comenzar "

  return (
    <div className="chatHeader">
      <div className='chatHeader__left'>
        <h3>
          <span className='chatHeader__hash'>
            <Avatar>
              {/**AQUI VA LA FOTO DEL USUARIO CON EL QUE SE ESTA HABLANDO  */}
            </Avatar>
          </span>
          {nombreChat ? nombreChat : chatVacio}
        </h3>
      </div>
      <div className='chatHeader__right'>
        <Notifications />
        <LocationOn />
        <PeopleAlt />

        <div className="chatHeader__search">
          <input placeholder='buscar' />
          <Search />
        </div>
        <Send />
        <Help />
      </div>
    </div>
  )
}

export default EncabezadoChat