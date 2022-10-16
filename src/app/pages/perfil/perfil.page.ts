import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { v4 } from 'uuid';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private route: ActivatedRoute, private usuarioService:UsuarioService, private storage: StorageService,
    private toastController: ToastController) { }
  rut: any;
  sesion: any = [];
  default: any = undefined;
  verificar_password: any;
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

  carro = new FormGroup(
    {
      patente: new FormControl(''),
      pasajeros: new FormControl(''),
      modelo: new FormControl(''),
      marca: new FormControl(''),
      imagen: new FormControl(''),
      dueno: new FormControl(this.sesion.rut),
      anio: new FormControl('')
    }
  );
  KEY = "usuarios";
  async ngOnInit() {
    let rut = await this.route.snapshot.paramMap.get('rut');
    this.sesion = await this.storage.getDato(this.KEY, rut);
   /*  await this.sesion = this.storage.getDato(this.KEY, 'rut'); */
  }

  valorPerfil(num){
    var numero = num;
    if(numero==1){
      this.default = 1;
    }
    else if(numero==2){
      this.default = 2;
    }
    else if(numero==3){
      this.default = 3;
    }
    else{
      this.default= undefined;
    }
  }
  async modificar(num){
    if(num==1){
      var alerta = "Perfil modificado";
      await this.toastError(alerta);
      return true;
    }
    else if(num==2){
        this.sesion.vehiculo = this.carro.value;
        await this.storage.actualizar(this.KEY, this.sesion);
        var cambio = this.sesion.rut;
        this.sesion = await this.storage.getDato(this.KEY, cambio);
        this.default = 4;
        var alerta = "Auto agregado";
        await this.toastError(alerta);
    }
    
  }
  async toastError(alerta) {
    const toast = await this.toastController.create({
      message: alerta,
      duration: 3000
    });
    toast.present();
  }
}