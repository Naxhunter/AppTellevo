import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';



declare var google;

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.page.html',
  styleUrls: ['./solicitud.page.scss'],
})
export class SolicitudPage implements OnInit {
  KEY_VIAJES: any = "viajes";
  KEY_USUARIO = "usuarios";
  rut: any;
  rutpasajero: any;
  nombre: any;
  sesion: any = [];
  listado: any = [];
  datos: any;
  solicitud: any;
  usuario : any = [];
    
  constructor(private navCtrl: NavController, private route: ActivatedRoute, private usuarioService: UsuarioService, private storage: StorageService
    , private router: Router) { }

  async ngOnInit() {
    let rut = this.route.snapshot.paramMap.get('rut');
    this.usuario = await this.storage.getDato(this.KEY_USUARIO, rut);
    await this.getListado(rut);
    
  }


  async getListado(rut) {
    this.listado = await this.storage.getDatos(this.KEY_VIAJES);
    this.listado.forEach(async (value, index) => {
      if (rut == value.rut_conductor) {
        this.solicitud = [...value.pasajeros];}});
  }



async eliminarPasajeros(rutpasajero, rutSesion){
  await this.storage.eliminarPasajero(this.KEY_VIAJES,this.usuario.rut,rutpasajero);
  await this.getListado(rutSesion);
 }

}
/* async eliminar(key, identificador) {
  this.datos = await this.storage.get(key) || [];

  this.datos.forEach((value, index) => {
    if (value.rut == identificador) {
      this.datos.splice(index, 1);
    }
  });

  await this.storage.set(key, this.datos);
} */







