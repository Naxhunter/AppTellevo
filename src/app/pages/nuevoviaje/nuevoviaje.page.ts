import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { StorageService } from 'src/app/services/storage.service';
import { v4 } from 'uuid';
import { ToastController } from '@ionic/angular';

declare var google;
@Component({
  selector: 'app-nuevoviaje',
  templateUrl: './nuevoviaje.page.html',
  styleUrls: ['./nuevoviaje.page.scss'],
})


export class NuevoviajePage implements OnInit {

  viaje = new FormGroup({
    id: new FormControl(v4()),
    origen: new FormControl(''),
    destino: new FormControl(''),
    precio: new FormControl(''),
    salida: new FormControl(''),
    iniciado: new FormControl('0'),
    rut_conductor: new FormControl(''),
    capacidad: new FormControl(''),
    pasajeros: new FormControl('sin')
  });

  
  //2. VAMOS A CREAR LAS VARIABLES NECESARIAS PARA EL MAPA:
  mapa: any;
  marker: any;
  search: any;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  usuario: any = [];
  rut: any
  KEY: any = "usuarios";
  KEY_VIAJES: any = "viajes";

  ubicacionDuoc :any;
  ubicacionDestino :any;
  local1 : any;
  searches:any ;
  place:any;
  alert
  constructor(private router: Router, private route: ActivatedRoute, private usuarioService: UsuarioService, private storage: StorageService, private toastcontroller:ToastController) { }





  async ngOnInit() {
    let rut = await this.route.snapshot.paramMap.get('rut');
    this.usuario = await this.storage.getDato(this.KEY, rut);

    this.dibujarMapa();
    this.agregarMarcador();
    this.getInicio(this.mapa, this.marker);
    this.buscarDestino(this.mapa, this.marker);
    

  }

  //3. VAMOS A CREAR LOS MÉTODOS NECESARIOS PARA EL MAPA:
  //método que dibuja el mapa en el div map:
  dibujarMapa() {
    var map: HTMLElement = document.getElementById('map');
    this.mapa = new google.maps.Map(map, {
      center: this.ubicacionDuoc,
      zoom: 18
    });
    this.directionsRenderer.setMap(this.mapa);
    this.marker = new google.maps.Marker({
      position: this.ubicacionDuoc,
      map: this.mapa
    });

  }

  //agregar un nuevo marcador al mapa:
  agregarMarcador() {
    this.marker.setPosition(this.ubicacionDuoc);
    this.marker.setMap(this.mapa);
  }

  //método para que el input me muestre sugerencias de busqueda de dirección:
  async buscarDestino(mapaLocal, marcadorLocal) {
    var autocomplete: HTMLElement = document.getElementById('autocomplete');
    const search = new google.maps.places.Autocomplete(autocomplete);
    this.searches = search;
  
    search.addListener('place_changed', function () {
      var places = search.getPlace().geometry.location;

      console.log('Destino: '+ typeof places);
      var variable = JSON.stringify(places);
      console.log("soy la varibale",variable);
     /*  this.ubicacionDestino.lat = place;
      this.ubicacionDestino.lng = place; */
      this.ubicacionDestino = variable
      console.log("ver ubi destino: ",this.ubicacionDestino);

      mapaLocal.setCenter(places);
      mapaLocal.setZoom(15);
      marcadorLocal.setPosition(places);
    });
    
   
  }

 
  async getInicio(mapaLocal, marcadorLocal) {
    var autocomplete: HTMLElement = document.getElementById('inicio');
    const search = new google.maps.places.Autocomplete(autocomplete);

    this.search = search;
    search.addListener('place_changed', function () {
      var place = search.getPlace().geometry.location;
      
      console.log('Inicio: '+place)

      var places = JSON.stringify(place);

       var cordenadas = JSON.parse(places)
    
      mapaLocal.setCenter(place);
      mapaLocal.setZoom(15);
      marcadorLocal.setPosition(place);
      this.ubicacionDuoc = cordenadas;
      console.log(this.ubicacionDuoc)
    });
  }



   calcularRuta() {
    var place = this.search.getPlace().geometry.location;
    var places= this.searches.getPlace().geometry.location;
    var request = {
      
      origin: place,
      destination: places,
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsService.route(request, (respuesta, status) => {
      this.directionsRenderer.setDirections(respuesta);
    });

    this.marker.setPosition(null);

    this.ubicacionDuoc = JSON.parse(JSON.stringify(place))
    this.ubicacionDestino =JSON.parse(JSON.stringify(places))
  }

  //mi ubicacion actual:
  async getUbicacionActual(): Promise<any> {
    return await new Promise(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    );
  }
  async nuevoViaje(){
    var capacidad: any = this.usuario.vehiculo.pasajeros;
    await this.calcularRuta();
    var origen: any = this.ubicacionDuoc;
    var destino: any = this.ubicacionDestino;
    console.log(origen)
    console.log(destino)
    await this.viaje.controls.origen.setValue(origen);
    await this.viaje.controls.destino.setValue(destino);
    await this.viaje.controls.capacidad.setValue(capacidad);
    var guardar = await this.storage.agregarViaje(this.KEY_VIAJES, this.viaje.value);
    if (guardar == true) {
      this.viaje.reset();
      this.alert='¡VIAJE CREADO! Espera a que te lleguen solicitudes';
      this.toastError(this.alert);
    }
  } 

  async toastError(alerta) {
    const toast = await this.toastcontroller.create({
      message: alerta,
      duration: 3000
    });
    toast.present();
  }



}





