import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

/* aca  van las variables  */
  usuarios :any[] = [];

  constructor() {  }

/* METODOS PARA EL CRUD */
  
  agregarUsuario(usuario){
    this.usuarios.push(usuario);
  }

  eliminarUsuario(rut){

  }


  actualizarUsuario(usuario){

  }

  
  obtenerUsuario(){

  }

  obtenerUsuarios(){
    return this.usuarios;
  }

 /// METODOS CUSTOMER:
validarRecuperar(rut,correo){

  return this.usuarios.find(usu => usu.rut == rut && usu.correo == correo);
  

}
  


  


}
