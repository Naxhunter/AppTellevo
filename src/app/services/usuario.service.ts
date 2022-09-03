import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

/* aca  van las variables  */
  usuarios :any[] = [

    {
      rut: '11.009.200-1',
      nom_completo: 'Gemela',
      fecha_nac : '1966-08-05',
      semestre: 6,
      password: 'admin',
      tipo_usuario: 'administrador'
    },
    {
      rut: '20.000.200-1',
      nom_completo: 'Same',
      fecha_nac : '2000-10-05',
      semestre: 2,
      password: 'default',
      tipo_usuario: 'alumno'
    },

  ];

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

validarLogin(rut,password){

  return this.usuarios.find(usu => usu.rut == rut && usu.password == password);
  

}
  


  


}
