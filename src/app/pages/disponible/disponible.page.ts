import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
declare var google;
@Component({
  selector: 'app-disponible',
  templateUrl: './disponible.page.html',
  styleUrls: ['./disponible.page.scss'],
})
export class DisponiblePage implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private usuarioService: UsuarioService, private storage: StorageService) { }
  //Variables disponible
  template = 1;
  idPasaje: any = [];
  solicitud: any;
  detalle: any = [];
  usuario: any = [];
  viajes: any = [];
  total: any = [];
  rut: any
  KEY_VIAJE = "viajes";
  KEY_USUARIO = "usuarios";
  //Variables detalle
  mapa: any;
  marker: any;
  search: any;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  inicio: any;
  final: any;
  datos: any;
  /* waypoints = WayPoint [] = */  /* DESCOMENTAR CUANDO SE CARGUEN EN LOS WAYPOINTS PARA TRAZAR LA RUTA DE LOS OTROS VIAJES INTEGRANDO EL LOCALSTORAGE SEGUN DONDE VAN LOS PASAJEROS */
  ubicacionDuoc = { lat: 0, lng: 0 };
  ubicacionDos = { lat: -33.600379048832046, lng: -70.57719180496413 };
  KEY: any = "viajes";

  /* métodos disponible */
  async ngOnInit() {
    console.log("Entre en Disponible:");
    let rut = this.route.snapshot.paramMap.get('rut');
    this.usuario = await this.storage.getDato(this.KEY_USUARIO, rut);
    console.log("Traigo al usuario en sesión:", this.usuario);
    this.viajes = await this.storage.getDatos(this.KEY_VIAJE);
    console.log("Traigo los viajes:", this.viajes);
    this.viajes.forEach(async (value, index) => {
      console.log("Entro en el foreach");
      var interna = await this.storage.getDato(this.KEY_USUARIO, value.rut_conductor);
      var precio = value.precio;
      var arreglo = {
        precios: value,
        dato: interna
      };
      this.total.push(arreglo);
    });
    console.log("Total", this.total);
  }
  async irDetalle(rut) {
    console.log("entro al método");
    await this.total.forEach(async (value, index) => {
      if (value.dato.rut == rut) {
        console.log("entro al detalle");
        this.template = 2;
        var detalleViaje = value;
        this.detalle = detalleViaje;
        var geo = await this.getUbicacionActual();
        this.ubicacionDuoc.lat = geo.coords.latitude;
        this.ubicacionDuoc.lng = geo.coords.longitude;
        await this.buscarViaje(value.precios.rut_conductor);
        await this.dibujarMapa();
        console.log("arreglo detalle: ", this.detalle);
      };
    });
  }

  /* métodos detalle */
  async irViajes() {
    this.template = 1;
  }
  async irSolicitar(rut) {
    var user = this.usuario.rut;
    await this.storage.guardarNuevoPasajero(rut);
    this.idPasaje = await this.storage.getDatos(this.KEY_VIAJE);
    this.idPasaje.forEach(async (value, index) => {
      if (rut == value.rut_conductor) {
        /*value.pasajeros = {...value.pasajeros, user };*/
        var nuevaCapacidad = value.capacidad-1;
        this.solicitud = [...value.pasajeros];
        this.solicitud.push(user);
        var creacion: any = {
          id: value.id,
          origen: value.origen,
          destino: value.destino,
          precio: value.precio,
          salida: value.salida,
          iniciado: value.iniciado,
          rut_conductor: value.rut_conductor,
          capacidad: nuevaCapacidad,
          pasajeros: this.solicitud,
        };
        console.log("creacion: ", creacion);
        await this.storage.actualizar(this.KEY_VIAJE, creacion);
      }
    });

  }
  /*var arreglo = {
        precios: value,
        dato: interna
        };*/
  /*this.idPasaje.push(this.solicitud);*/
  /*console.log("0)",this.idPasaje);
  this.solicitud = this.idPasaje.pasajeros;
  console.log("1)",this.solicitud);
  this.solicitud.push(user);
  console.log("Nuevo pasajero", this.solicitud);
  this.idPasaje.pasajeros = this.solicitud;
  console.log("Objeto completo: ", this.idPasaje);
  await this.storage.actualizar(this.KEY_VIAJE, this.idPasaje);*/
  /*
 async irSolicitar(rut){
    console.log("Entro en solicitar. Rut parametro:",rut);
    var user = this.usuario.rut;
    console.log("rut user sesión: ", user);
    this.solicitud = await this.storage.getDatos(this.KEY_VIAJE);
    this.solicitud.forEach(async (value, index) => {
      console.log("Entro en el foreach");
      console.log("value rut conductor 1:", value.rut_conductor);
      if(value.rut_conductor == rut){
        console.log("rut igual al parametro, entro");
        console.log("value pasajeros 1: ", value.pasajeros);
         if(value.pasajeros == 'sin'){
           console.log("Si es sin, entro.")
           value.pasajeros.split(index, 1);
           console.log("elimino con split, intento mostrar: ",value.pasajeros);
           value.pasajeros = {user};
           console.log("value pasajero reasignado: ", value.pasajero);
           await this.storage.actualizar(this.KEY_VIAJE,this.solicitud);
           return;
         } else {
           value.pasajeros.push(this.usuario.rut);
           console.log("supuestamente no tiene sin, se pushea un rut: ", value.pasajaeros);
           await this.storage.actualizar(this.KEY_VIAJE,this.solicitud);
         }
         return console.log("no encontre nada.");
      }
    });
  }
*/
  async dibujarMapa() {
    var map: HTMLElement = document.getElementById('map');
    this.mapa = await new google.maps.Map(map, {
      center: this.ubicacionDuoc,
      zoom: 13
    });
    await this.directionsRenderer.setMap(this.mapa);
    var indicaciones: HTMLElement = await document.getElementById('indicaciones');
    await this.directionsRenderer.setPanel(indicaciones);
    this.marker = await new google.maps.Marker({
      position: this.ubicacionDuoc,
      map: this.mapa
    });
  }

  async agregarMarcador() {
    await this.marker.setPosition(this.ubicacionDos);
    await this.marker.setMap(this.mapa);
  }

  async calcularRuta() {
    var place = await this.search.getPlace().geometry.location;
    var request = {
      origin: this.ubicacionDuoc,
      destination: place,
      travelMode: google.maps.TravelMode.DRIVING
      /* waypoints: this.wayPoints,
   optimizeWaypoints: true,  DESCOMENTAR  CUANDO SE OCUPE LOCAL STORAGE*/
    };

    await this.directionsService.route(request, async (respuesta, status) => {
      await this.directionsRenderer.setDirections(respuesta);
    });

    await this.marker.setPosition(null);
  }
  async getUbicacionActual(): Promise<any> {
    return new Promise(
      async (resolve, reject) => {
        await navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    );
  }
  async buscarViaje(identificador) {
    this.datos = await this.storage.getDatoViaje(this.KEY, identificador);
    console.log(this.datos)
    return this.datos;
  }

}
