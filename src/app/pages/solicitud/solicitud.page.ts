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
  usuario: any = [];
  template = 1;
  detalleViaje: any = [];

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
        this.solicitud = [...value.pasajeros];
      }
    });
  }



  async eliminarPasajeros(rutpasajero, rutSesion) {
    await this.storage.eliminarPasajero(this.KEY_VIAJES, this.usuario.rut, rutpasajero);
    await this.getListado(rutSesion);
  }

  async iniciarViaje() {
    var rut = this.usuario.rut;
    await this.storage.inicioViaje(rut);
    this.detalleViaje = await this.storage.getDatoViaje(this.KEY_VIAJES, rut);
    this.template = 2;
    var geo = await this.getUbicacionActual();
    this.ubicacionDuoc.lat = geo.coords.latitude;
    this.ubicacionDuoc.lng = geo.coords.longitude;
    await this.dibujarMapa();
    await this.agregarMarcador();
    await this.buscarDireccion(this.mapa, this.marker);
  }
  async finalizarViaje(num){
    var rut = this.usuario.rut;
    await this.storage.eliminarViaje(this.KEY_VIAJES,rut);
    this.template = num;
  }



  mapa: any;
  marker: any;
  search: any;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  ubicacionDuoc = { lat: 0, lng: 0 };
  ubicacionDos = { lat: -33.600379048832046, lng: -70.57719180496413 };
  dibujarMapa() {
    var map: HTMLElement = document.getElementById('map');
    this.mapa = new google.maps.Map(map, {
      center: this.ubicacionDuoc,
      zoom: 18
    });
    this.directionsRenderer.setMap(this.mapa);
    var indicaciones: HTMLElement = document.getElementById('indicaciones');
    this.directionsRenderer.setPanel(indicaciones);
    this.marker = new google.maps.Marker({
      position: this.ubicacionDuoc,
      map: this.mapa
    });
  }
  agregarMarcador() {
    this.marker.setPosition(this.ubicacionDos);
    this.marker.setMap(this.mapa);
  }
  buscarDireccion(mapaLocal, marcadorLocal) {
    var autocomplete: HTMLElement = document.getElementById('autocomplete');
    const search = new google.maps.places.Autocomplete(autocomplete);
    this.search = search;
    search.addListener('place_changed', function () {
      var place = search.getPlace().geometry.location;
      mapaLocal.setCenter(place);
      mapaLocal.setZoom(15);
      marcadorLocal.setPosition(place);
    });
  }
  calcularRuta() {
    var place = this.search.getPlace().geometry.location;
    var request = {
      origin: this.ubicacionDuoc,
      destination: place,
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsService.route(request, (respuesta, status) => {
      this.directionsRenderer.setDirections(respuesta);
    });
    this.marker.setPosition(null);
  }
  getUbicacionActual(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    );
  }

}







