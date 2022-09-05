import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

/* aca  van las variables  */
  usuarios :any[] = [

    {
      rut: '11009200-1',
      nombre: 'Gemela',
      apellido: 'Gutierrez',
      correo: 'jorsh@gmail.com',
      fecha_nac : '1966-08-05',
      auto: 'no',
      password: 'admin',
      tipo_usuario: 'administrador'
    },
    {
      rut: '20009200-1',
      nombre: 'Carlos',
      apellido: 'Prado',
      correo: 'Carlitosprado@gmail.com',
      fecha_nac : '1967-08-05',
      auto: 'no',
      password: 'default',
      tipo_usuario: 'alumno'
    },
    {
      rut: '21239230-5',
      nombre: 'Andrea',
      apellido: 'Cespedes',
      correo: 'AndreaCesp@gmail.com',
      fecha_nac : '1997-02-01',
      auto: 'si',
      password: 'default',
      tipo_usuario: 'alumno'
    },

  ];

  constructor() {  }

/* METODOS PARA EL CRUD */
  
  agregarUsuario(usuario){
    if(this.obtenerUsuario(usuario.rut) == undefined){
      this.usuarios.push(usuario);
      return true;
    }
    return false;
  }

  eliminarUsuario(rut){
    this.usuarios.forEach((usu, index) => {
      if (usu.rut == rut) {
        this.usuarios.splice(index, 1);
      }
    });
  }


  actualizarUsuario(usuario){
    var index = this.usuarios.findIndex(usu => usu.rut == usuario.rut);
    this.usuarios[index] = usuario;
  }

  
  obtenerUsuario(rut){
    return this.usuarios.find(usuario => usuario.rut == rut);
  }

  obtenerUsuarios(){
    return this.usuarios;
  }

 /// METODOS CUSTOMER:
validarRecuperar(rut,correo): boolean{
  if(this.usuarios.find(usu => usu.rut == rut && usu.correo == correo) != undefined){
    return true;
  }
  return false;
}

validarLogin(rut,password): any{
  return this.usuarios.find(usu => usu.rut == rut && usu.password == password);
}





  


}
