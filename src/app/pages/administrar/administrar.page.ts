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
  rut: any;
  sesion: any = [];
  variable: string = "Administrar";
  listado: any = undefined;
  registrar: any = undefined;
  modificar: any = undefined;
  eliminar: any = undefined;
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
}
