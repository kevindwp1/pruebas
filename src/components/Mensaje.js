import React, { useState } from 'react'
import { Avatar } from "@material-ui/core"
import { ExpandMore } from "@material-ui/icons";
import OpcionsMsg from './OpcionsMsg';



function Mensaje({ mensajeFirebase }) {


  //traductor
  function traducir(submitMen) {
    const encodedParams = new URLSearchParams();
    encodedParams.append("q", mensajeFirebase.message);
    encodedParams.append("target", "es");
    encodedParams.append("source", "en");

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
        'X-RapidAPI-Key': '2fdd2c44bemsh62631c70eade1aep1dcf67jsn263f13537201'
      },
      body: encodedParams
    };

    fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));

  }

  return (
    <div className="message">
      <div>
      </div>
      <div className="message__info">
        <p>
          {mensajeFirebase.message}
        </p>
        <div>
        </div>
        <span className="message__timestamp">
          {mensajeFirebase.dateUtc}
        </span>
        <OpcionsMsg />
      </div>
    </div>
  );
}

export default Mensaje




