import React, { useState, useEffect, useRef } from "react";
import EncabezadoChat from "../components/EncabezadoChat";
import { AddCircle, CreditCard, Gif, EmojiEmotions } from "@material-ui/icons"
import Mensaje from "../components/Mensaje";
import { Mic } from "@material-ui/icons";
import Load from "../components/Load";
import { getAuth } from "firebase/auth";



//----------CON ESTO MANDAMOS LLAMAR A FIREBASE Y A FIRESTORE
import firebaseApp from "../firebase/credenciales"
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs
}
  from "firebase/firestore"
const auth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)

function ChatScreen({ chatActivo, usuarioGlobal, idActivo }) {

  const canalVacio = "Elige un chat"
  const canalSeleccionado = "Escribe un mensaje aqui"

  //este estado se ocupa para llamar el valor del mensaje ingresado por el usuario
  const [inputMensaje, setInputMensaje] = useState("")
  //este estado se ocupa para la lista de mensajes a mostrar al usuario
  const [listaMensajes, setListaMensajes] = useState([])
  const [tipoMensaje, setTipoMensaje] = useState(null)

  //ESTA ES LA ANCLA PARA QUE SE MUESTRE EL ULTIMO MENSAJE ENVIADO
  const anchor = useRef();


  async function getListaMensajes() {

    const chats = []
    const docuRefChat = collection(firestore, `users/${usuarioGlobal.uid}/chats`)
    const datoChat = await getDocs(docuRefChat)
    datoChat.forEach(datoCifrado => {
      chats.push(datoCifrado.data().idChat)
    })
    /**
     * el id activo viene desde el side bar al momento de dar click en el usuario con el que quiero hablar 
    */
    const idMensaje = chats[idActivo]
    const mensajes = []

    const docuRefMens = collection(firestore, `/users/${usuarioGlobal.uid}/chats/${idMensaje}/Messages`)
    const datoMen = await getDocs(docuRefMens)
    datoMen.forEach(datoCifrado => {
      mensajes.push(datoCifrado.data())


      /*if (datoCifrado.data().type === "send") {
        console.log('emisor')
        setTipoMensaje(true)

      } else {
        console.log('receptor')
        setTipoMensaje(false)
        console.log(tipoMensaje)
      }

   */
    })
    console.log(idMensaje)



    setListaMensajes([...mensajes]);

    console.log(chats)

  }


  async function enviarMensaje(e) {
    e.preventDefault();
    const chats = []
    const docuRefChat = collection(firestore, `users/${usuarioGlobal.uid}/chats/`)
    const datoChat = await getDocs(docuRefChat)
    datoChat.forEach(datoCifrado => {
      chats.push(datoCifrado.data().idChat)
    })
    const idMensaje = chats[idActivo]
    const docuRef = doc(firestore, `users/${usuarioGlobal.uid}/chats/${idMensaje}/Messages/${new Date().getTime()}`);
    setDoc(docuRef, {
      type: 'recivido',
      message: inputMensaje,
      isActive: true,
      dateUtc: new Date().toLocaleTimeString(),
    });
    setInputMensaje("");
    getListaMensajes();
    anchor.current.scrollIntoView({ behavior: "smooth" })
  }


  useEffect(() => {
    getListaMensajes();
  }, [chatActivo]);




  /**---------------------VISTA-------------------------------------------- */
  return (
    <div className="chat">
      <EncabezadoChat nombreChat={chatActivo} />



      <div className="chat__messages">
        {/**-------MAPEAR MENSAJES DE FIREBASE --------*/}
        {/**aqui se hace que se muestren los mensajes */}
        {chatActivo ? null : <Load />}

        {listaMensajes ? listaMensajes.map((mensaje) => {
          return <Mensaje mensajeFirebase={mensaje} />;
        })
          : null
        }

        {/**Esto sirve para que se autodeslice al ultimo mensaje enviado */}
        <div

          ref={anchor}
          style={chatActivo ? { marginBottom: "65px" } : { marginBottom: "0px" }}
        >

        </div>
      </div>


      <div className="chat__input">
        {/*Para enviar imagenes */}
        <AddCircle fontSize="large" />




        {/**FORMULARIO PARA ENVIAR MENSAJE */}
        <form onSubmit={enviarMensaje}>
          <input
            type="text"
            disabled={chatActivo ? false : true}
            value={inputMensaje}
            onChange={(e) => setInputMensaje(e.target.value)}
            placeholder={` ${chatActivo ? canalSeleccionado : canalVacio}`} />

          <button
            disabled={chatActivo ? false : true}
            className="chat__inputButton"
            type="submit">Enviar Mensaje
          </button>


        </form>

        <div className="chat__inputIcons">
          <Mic fontSize="large" />
          <EmojiEmotions fontSize="large" />
        </div>
      </div>
    </div>
  )
}

export default ChatScreen


