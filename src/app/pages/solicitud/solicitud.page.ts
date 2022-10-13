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
  KEY: any = "pasajeros";
  rut: any;
  rutpasajero: any;
  nombre: any;
  sesion: any = [];
  listado: any = undefined;


  constructor(private navCtrl: NavController, private route: ActivatedRoute, private usuarioService: UsuarioService, private storage: StorageService
    , private router: Router) { }

  async ngOnInit() {
    let rut = this.route.snapshot.paramMap.get('rut');
  }


  async getListado() {

    this.listado = await this.storage.getDato(this.KEY, this.rut);
  }

  async AceptarSolicitud() {
    var rutPasajero: HTMLElement = document.getElementById('rutpasajero');
    var nombrePasajero : HTMLElement = document.getElementById('nompasajero');
    this.rutpasajero = rutPasajero;
    this.nombre = nombrePasajero;




  }









}
