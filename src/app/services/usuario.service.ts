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

validarRut(rut): boolean {
  var rutSimple = rut.replace('-', '');
  rutSimple = rutSimple.substring(0, rutSimple.length - 1);
  var rutArreglo: any[] = rutSimple.split('').reverse();
  var acumulador: number = 0;
  var multiplo: number = 2;
  for (let digito of rutArreglo) {
    acumulador = acumulador + digito * multiplo;
    multiplo++;
    if (multiplo > 7) {
      multiplo = 2;
    }
  }
  var resto: number = acumulador % 11;
  var dvCalculado: any = 11 - resto;
  if (dvCalculado >= 11) {
    dvCalculado = '0';
  } else if (dvCalculado == 10) {
    dvCalculado = 'K';
  }
  var dvRut: string = rut.substring(rut.length - 1).toUpperCase();
  if (dvRut == dvCalculado.toString()) {
    return true;
  } else {
    return false;
  }
}





  


}
