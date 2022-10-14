import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
declare var google;
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private usuarioService: UsuarioService, private storage: StorageService) { }
  detalle: any = [];

  async ngOnInit() {
    /*  this.usuario = this.router.getCurrentNavigation().extras.state.usuario; */
    try {

      this.detalle = await this.router.getCurrentNavigation().extras.state;
      if (this.detalle !== undefined) {
        console.log("este es el detalle: ", this.detalle);
        var geo = await this.getUbicacionActual();
        this.ubicacionDuoc.lat = geo.coords.latitude;
        this.ubicacionDuoc.lng = geo.coords.longitude;
        this.buscarViaje();
        this.dibujarMapa();
      }

    } catch (e) {
      console.log(e);
    }

    //this.agregarMarcador();
    /*  this.buscarDireccion(this.mapa, this.marker); */

  }


  //2. VAMOS A CREAR LAS VARIABLES NECESARIAS PARA EL MAPA:
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
  id: any = "20334957-2";



  //3. VAMOS A CREAR LOS MÉTODOS NECESARIOS PARA EL MAPA:
  //método que dibuja el mapa en el div map:
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

  //agregar un nuevo marcador al mapa:
  agregarMarcador() {
    /* new google.maps.Marker({
      position: this.ubicacionMcDonald,
      map: this.mapa
    }); */
    this.marker.setPosition(this.ubicacionDos);
    this.marker.setMap(this.mapa);
  }

  //método para que el input me muestre sugerencias de busqueda de dirección:
  /*  buscarDireccion(mapaLocal, marcadorLocal){
     var autocomplete: HTMLElement = document.getElementById('autocomplete');
     const search = new google.maps.places.Autocomplete(autocomplete);
     this.search = search;
  
     search.addListener('place_changed', function(){
       var place = search.getPlace().geometry.location;
       
       mapaLocal.setCenter(place);
       mapaLocal.setZoom(15);
  
       marcadorLocal.setPosition(place);
     });
   } */

  //MÉTODO PARA ENCONTRAR LA RUTA ENTRE 2 DIRECCIONES:
  calcularRuta() {
    var place = this.search.getPlace().geometry.location;

    var request = {
      origin: this.ubicacionDuoc,
      destination: place,
      travelMode: google.maps.TravelMode.DRIVING
      /* waypoints: this.wayPoints,
   optimizeWaypoints: true,  DESCOMENTAR  CUANDO SE OCUPE LOCAL STORAGE*/
    };

    this.directionsService.route(request, (respuesta, status) => {
      this.directionsRenderer.setDirections(respuesta);
    });

    this.marker.setPosition(null);
  }

  //mi ubicacion actual:
  getUbicacionActual(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    );
  }


  async buscarViaje() {
    this.datos = await this.storage.getDatoViaje(this.KEY, this.id);

    console.log(this.datos)
    return this.datos;

  }


}
