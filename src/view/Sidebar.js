import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { ExpandMore, Add, ExitToApp } from "@material-ui/icons";
import firebaseApp from "../firebase/credenciales";
//ocupamos doc y setDoc para obtener informacion de la base de datos
//DOC: sirve para crear una referencia del  documento que queremos crear
//SETDOC: con esto le agregamos informacion 
//COLLECTION: permite que creemos una referencia de la coleccion
//GETDOCS : nos brinda la informacion
import { getFirestore, collection, doc, setDoc, getDocs, query } from 'firebase/firestore';
import CanalEnSidebar from "../components/CanalEnSidebar";




//aqui se trae la autenticacion 
import { getAuth, signOut } from "firebase/auth";


//aqui se guarda el usuario autenticado
const auth = getAuth(firebaseApp)
//se crea la constante para obtener la base de datos y se coloca getFirestore y tus credenciales que vienen desde el firebaseApp
const firestore = getFirestore(firebaseApp)


function Sidebar({ usuarioGlobal, setChatActivo, setIdActivo, idActivo }) {

  console.log(usuarioGlobal)
  //estado de los canales
  const [listaChats, setListaChats] = useState([]);

  async function getChats() {

    const chats = []
    const docuRefChat = collection(firestore, `users/${usuarioGlobal.uid}/chats/`)
    const datoChat = await getDocs(docuRefChat)
    datoChat.forEach(datoCifrado2 => {
      chats.push(datoCifrado2.data())
    })
    setListaChats(chats)
  }

  //aqui se pide el nombre del nuevo usuario con el que quiero hablar
  function agregarCanal() {

    const nombreCanal = prompt("Cual es el nombre del usuario")

    if (nombreCanal) {
      //con esta constante creas el nombre de la coleccion
      //va entra hace la coleccion usuarios y despues agrega el ID con UID 
      const docuRefUsuario = collection(firestore, `users`)


      setDoc(doc(docuRefUsuario,), {
        //estos son las variables con las que contara el documento de la coleccion 
        id: new Date().getTime(),
        nombre: nombreCanal
      });
      //con esto generas que se actualice la lista de canales al agregar un canal 
      getChats();
    }
  }

  //El useEffect hace que cargue desde un inicio la lista canales 
  useEffect(() => {
    getChats();
  }, [])


  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>Chat Pangea</h3>
      </div>

      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">

            <h4>Chats</h4>
          </div>
          {/**Boton para agregar canales */}
          <Add
            //NOTA : si colocas los parentesis de la funcion se genera automaticamente y muchas veces al reiniciar la pagina
            onClick={''}
            className="sidebar__addChannel" />
        </div>

        <div className="sidebar_channelsList">
          {/**------------LISTA DE CANALES O CHATS --------------------*/}
          {/*Mapeo de canales en este momento */}
          {/**Cuano se da clic en esta parte se actualiza el encabezado de la app al canal seleccionado */}
          {listaChats ? listaChats.map((chats, index) => {
            return (
              <div onClick={() => {
                setChatActivo(chats.nameUser)
                setIdActivo(index)
                console.log(chats)
              }}>
                <CanalEnSidebar nombre={chats.nameUser} id={chats.idChat} date={chats.dateInit} />
              </div>
            );
          }) : null}
        </div>
      </div>

      <div className="sidebar__profile">
        <Avatar src={usuarioGlobal.photoURL} />
        <div className="sidebar__profileInfo">

          {/**
           * con el usuario global pasado desde la funcion principal se saca el nombre 
             * Nombre del usuario displayName
             * photoURL es la foto del usuario
             * uid es el ID  del usuario, hay que checar si con ese podemos hacer que solo aparezca ese chat
             */}
          <h3>  {usuarioGlobal.displayName}</h3>
          <p>{usuarioGlobal.email}</p>

        </div>
        <div className="sidebar__profileIcons">
          {/**Boton para cerrar sesion */}
          <ExitToApp fontSize="large" onClick={() => signOut(auth)} />
        </div>
      </div>


    </div >
  )
}

export default Sidebar