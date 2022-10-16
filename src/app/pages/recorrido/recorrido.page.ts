import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { StorageService } from 'src/app/services/storage.service';

declare var google;

interface WayPoint {
  location: {
    lat: number,
    lng: number,
  };
  stopover: boolean;
}

@Component({
  selector: 'app-recorrido',
  templateUrl: './recorrido.page.html',
  styleUrls: ['./recorrido.page.scss'],
})
export class RecorridoPage implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private usuarioService: UsuarioService, private storage: StorageService) { }
  

  async ngOnInit() {
    
    var geo = await this.getUbicacionActual();
    this.ubicacionDuoc.lat = geo.coords.latitude;
    this.ubicacionDuoc.lng = geo.coords.longitude;

    this.dibujarMapa();
    this.agregarMarcador();
    this.buscarDireccion(this.mapa, this.marker);
  
  }

  

 mapa: any;
 marker: any;
 search: any;
 directionsService = new google.maps.DirectionsService();
 directionsRenderer = new google.maps.DirectionsRenderer();
 ubicacionDuoc = { lat: 0, lng: 0 };
 ubicacionDos = { lat: -33.600379048832046, lng: -70.57719180496413 };




 

 dibujarMapa(){
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

 
 agregarMarcador(){
   this.marker.setPosition(this.ubicacionDos);
   this.marker.setMap(this.mapa);
 }


 buscarDireccion(mapaLocal, marcadorLocal){
   var autocomplete: HTMLElement = document.getElementById('autocomplete');
   const search = new google.maps.places.Autocomplete(autocomplete);
   this.search = search;

   search.addListener('place_changed', function(){
     var place = search.getPlace().geometry.location;
     
     mapaLocal.setCenter(place);
     mapaLocal.setZoom(15);

     marcadorLocal.setPosition(place);
   });
 }


 calcularRuta(){
  
    var place = this.search.getPlace().geometry.location;

    var request = {
      origin: this.ubicacionDuoc,
      destination: place,
      travelMode: google.maps.TravelMode.DRIVING
   };

   this.directionsService.route(request, (respuesta, status)=> {
     this.directionsRenderer.setDirections(respuesta);
   });

   this.marker.setPosition(null);
 }
 getUbicacionActual(): Promise<any>{
   return new Promise(
     (resolve, reject) => {
       navigator.geolocation.getCurrentPosition(resolve, reject);
     }
   );
 }

}


