import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.page.html',
  styleUrls: ['./administrar.page.scss'],
})
export class AdministrarPage implements OnInit {
  alumno = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(3)]),
    correo: new FormControl('',[Validators.email,Validators.required]),
    fecha_nac: new FormControl('', Validators.required),
    auto: new FormControl('',Validators.required),
    password: new FormControl('', [Validators.required, 
                                   Validators.minLength(6),
                                   Validators.maxLength(18)]),
    tipo_usuario: new FormControl('',Validators.required)
  });
  
  rut: any;
  sesion: any = [];
  variable: string = "Administrar";
  listado: any = undefined;
  registrar: any = undefined;
  modificar: any = undefined;
  eliminar: any = undefined;
  verificar_password: string;
  usuario_buscado: any = [];
  constructor(private navCtrl:NavController, private route: ActivatedRoute, private usuarioService: UsuarioService) { }

  ngOnInit() {
    let rut = this.route.snapshot.paramMap.get('rut');
    this.sesion = this.usuarioService.obtenerUsuario(rut);
  }
  irRegistrar(){
    this.variable = "Registrar Usuario";
    this.listado = undefined;
    this.modificar = undefined;
    this.eliminar = undefined;
    this.registrar = 1;
  }
  irListar(){
    this.variable = "Listar Usuarios";
    this.registrar = undefined;
    this.eliminar = undefined;
    this.modificar = undefined;
    this.listado = this.usuarioService.obtenerUsuarios();
  }
  irModificar(){
    this.variable = "Modificar Usuario";
    this.listado = undefined;
    this.modificar = 1;
    this.eliminar = undefined;
    this.registrar = undefined;
  }
  irEliminar(){
    this.variable = "Eliminar Usuario";
    this.listado = undefined;
    this.modificar = undefined;
    this.eliminar = 1;
    this.registrar = undefined;
  }
  
  registrarAdmin(){
    if (this.alumno.controls.password.value != this.verificar_password) {
      alert('¡CONTRASEÑAS NO COINCIDEN!');
      return;
    }
    this.usuarioService.agregarUsuario(this.alumno.value);
    this.alumno.reset();
    alert('¡USUARIO REGISTRADO!');
  }
  eliminarAdmin(){
    if(this.sesion.rut == this.alumno.controls.rut.value){
      alert('¡NO TE PUEDES ELIMINAR A TI MISMO!')
    }
    else{
      this.usuarioService.eliminarUsuario(this.alumno.controls.rut.value);
      alert('¡USUARIO ELIMINADO!');
    }
    
  }
  buscarAdmin(){
    this.usuario_buscado = this.usuarioService.obtenerUsuario(this.alumno.controls.rut.value);
    this.modificar = 2;
    return this.usuario_buscado;
  }
  modificarAdmin(){
    if (this.alumno.controls.password.value != this.verificar_password) {
      alert('¡CONTRASEÑAS NO COINCIDEN!');
      return;
    }
    this.usuarioService.actualizarUsuario(this.alumno.value);
    this.alumno.reset();
    alert('¡USUARIO ACTUALIZADO!');
  }
  
  perfil(rut){
    this.navCtrl.navigateForward(['/perfil',rut]);
  }
  cerrarSesion(){
    this.navCtrl.navigateForward(['/login']);
  }
  irCrearViaje(){
    this.navCtrl.navigateForward(['/nuevoviaje']);
  }
  irSolicitudViaje(){
    this.navCtrl.navigateForward(['/solicitud']);
  }
}
