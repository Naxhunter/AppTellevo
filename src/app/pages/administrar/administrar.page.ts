import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { v4 } from 'uuid';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.page.html',
  styleUrls: ['./administrar.page.scss'],
})
export class AdministrarPage implements OnInit {
  alumno = new FormGroup({
    id: new FormControl(''),
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{7,8}-[0-9kK]{1}')]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(3)]),
    correo: new FormControl('',[Validators.email,Validators.required, Validators.pattern('[0-9a-zA-Z](\.[_a-z0-9-]+)+@duocuc.cl')]),  
    fecha_nac: new FormControl('', Validators.required),
    auto: new FormControl('',Validators.required),
    vehiculo: new FormControl('undefined'),
    password: new FormControl('', [Validators.required, 
                                   Validators.minLength(6),
                                   Validators.maxLength(18)]),
    tipo_usuario: new FormControl('',Validators.required)
  });
  KEY :any = "usuarios";
  rut: any;
  sesion: any = [];
  variable: string = "Administrar";
  listado: any = undefined;
  registrar: any = undefined;
  modificar: any = undefined;
  eliminar: any = undefined;
  verificar_password: string;
  usuario_buscado: any = [];
  identificable: any;
  constructor(private navCtrl:NavController, private route: ActivatedRoute, private usuarioService: UsuarioService, private storage: StorageService
    ,private router: Router, private toastController: ToastController) { }

  async ngOnInit() {
    let rut = this.route.snapshot.paramMap.get('rut');
    this.sesion = await this.storage.getDato(this.KEY, rut);
  }
  irRegistrar(){
    this.variable = "Registrar Usuario";
    this.listado = undefined;
    this.modificar = undefined;
    this.eliminar = undefined;
    this.registrar = 1;
  }
  async irListar(){
    this.variable = "Listar Usuarios";
    this.registrar = undefined;
    this.eliminar = undefined;
    this.modificar = undefined;
    this.listado = await this.storage.getDatos(this.KEY);
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
  
  async registrarAdmin(){
    const now = new Date();
    let anioActual = now.getFullYear();
    const nacUsuario = new Date(this.alumno.controls.fecha_nac.value);
    let edadUsuario = nacUsuario.getFullYear();
    let resta = anioActual-edadUsuario;
    if (!this.usuarioService.validarRut(this.alumno.controls.rut.value)) {
      var alerta ='¡RUT INCORRECTO!';
      await this.toastError(alerta);
      return;
    }
    if(resta<17){
      var alerta ='¡MAYOR DE 17 AÑOS!';
      await this.toastError(alerta);
      return;
    } 
    if (this.alumno.controls.password.value != this.verificar_password) {
      var alerta ='¡CONTRASEÑAS NO COINCIDEN!';
      await this.toastError(alerta);
      return;
    }
    this.alumno.controls.id.setValue(v4());
    var guardar = await this.storage.agregar(this.KEY, this.alumno.value);
    if (guardar == true) {
      this.alumno.reset();
      var alerta ='¡USUARIO REGISTRADO!';
      await this.toastError(alerta);

    }
  }
  async eliminarAdmin(){
    if(this.sesion.rut == this.alumno.controls.rut.value){
      var alerta ='¡NO TE PUEDES ELIMINAR A TI MISMO!';
      await this.toastError(alerta);
    }
    else{
      await this.storage.eliminar(this.KEY,this.alumno.controls.rut.value);
      var alerta ='¡USUARIO ELIMINADO!';
      await this.toastError(alerta);
    }
    
  }
  async buscarAdmin(){
    this.usuario_buscado = await this.storage.getDato(this.KEY,this.alumno.controls.rut.value);
    this.modificar = 2;
    this.identificable = this.usuario_buscado.id;
    return this.usuario_buscado;
  }
  async modificarAdmin(){
    
    const now = new Date();
    let anioActual = now.getFullYear();
    const nacUsuario = new Date(this.alumno.controls.fecha_nac.value);
    let edadUsuario = nacUsuario.getFullYear();
    let resta = anioActual-edadUsuario;
    
    if(resta<17){
      var alerta ='¡MAYOR DE 17 AÑOS!';
      await this.toastError(alerta);
      return;
    } 
    if (this.alumno.controls.password.value != this.verificar_password) {
      var alerta ='¡CONTRASEÑAS NO COINCIDEN!';
      await this.toastError(alerta);
      return;
    }
    this.alumno.controls.id.setValue(this.identificable);
    this.alumno.controls.vehiculo.setValue('undefined');
    await this.storage.actualizar(this.KEY,this.alumno.value);
    this.alumno.reset();
    var alerta ='¡USUARIO ACTUALIZADO!';
    await this.toastError(alerta);
  }
  async toastError(alerta) {
    const toast = await this.toastController.create({
      message: alerta,
      duration: 3000
    });
    toast.present();
  }
}
