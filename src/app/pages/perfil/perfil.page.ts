import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private route: ActivatedRoute, private usuarioService:UsuarioService) { }
  rut: any;
  sesion: any = [];
  default: any = undefined;
  verificar_password: any;
  alumno = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{7,8}-[0-9kK]{1}')]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(3)]),
    correo: new FormControl('',[Validators.email,Validators.required, Validators.pattern('[0-9a-zA-Z](\.[_a-z0-9-]+)+@duocuc.cl')]),  
    fecha_nac: new FormControl('', Validators.required),
    auto: new FormControl('',Validators.required),
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
  ngOnInit() {
    let rut = this.route.snapshot.paramMap.get('rut');
    this.sesion = this.usuarioService.obtenerUsuario(rut);
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
  modificar(){
    
  }
}
