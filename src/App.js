import React, { useState } from "react";
//Importamos la aplicación/credenciales
import firebaseApp from "./firebase/credenciales";
import Login from "./view/Login"
import ChatScreen from "./view/ChatScreen"
import Sidebar from "./view/Sidebar"
//esto es para agregar los servicios de firebase
//el onAuthStateChanged es nuestro observador el cual verifica si se ha iniciado sesion o no 
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(firebaseApp);




function App() {

  //este estado nos muestra el usuario que inicio sesion
  const [usuarioGlobal, setUsuarioGlobal] = useState(null);
  //este estado nos muestra el canal activo 
  const [chatActivo, setChatActivo] = useState(null);
  const [idActivo, setIdActivo] = useState(null)

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      setUsuarioGlobal(usuarioFirebase)
      //aqui estamos pasando la informacion del usuario para que el 
      //observador verifique que existe una sesion



      console.log("Sesion Iniciada")

    } else {
      //no hay sesion iniciada
      setUsuarioGlobal(null)
    }
  })



  return (
    <div className="app">
      {usuarioGlobal ? (
        <>{""}

          <Sidebar
            usuarioGlobal={usuarioGlobal}
            setChatActivo={setChatActivo}
            setIdActivo={setIdActivo}

          />{""}

          <ChatScreen
            chatActivo={chatActivo}
            usuarioGlobal={usuarioGlobal}
            idActivo={idActivo}
          />
          {""}
        </>)
        : (<Login />
        )}
    </div>
  );
}

export default App;
