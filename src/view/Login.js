import React from "react";
import   {Button} from "@material-ui/core"

//importamos firebase  para la autenticacion 
import firebaseApp from "../firebase/credenciales";

//servicios a utilizar de firebase
import {getAuth,  GoogleAuthProvider, signInWithRedirect} from "firebase/auth"


//obtiene las credenciales e inicia el servicio
const auth = getAuth(firebaseApp)
//provedor de google 
const gProvider = new GoogleAuthProvider();

function Login(){
  
  function logInConGoogle(){

    //iniciar sesion con redireccion 
    signInWithRedirect(auth,gProvider)
  }

  return(
    <div className="login">
      <div className="login__logo">
        <img src="https://picsum.photos/420" alt=""/>
      </div>
      <Button onClick={logInConGoogle}> Acceder con Google </Button>
      Login
    </div>
  )
}
  export default Login