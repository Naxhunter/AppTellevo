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
  ubicacionDuoc = { lat: 0, lng: 0 };
  ubicacionDestino = { lat: -33.600379048832046, lng: -70.57719180496413 };

  constructor(private router: Router, private route: ActivatedRoute, private usuarioService: UsuarioService, private storage: StorageService,
    private toastController: ToastController) { }

  async ngOnInit() {
    let rut = await this.route.snapshot.paramMap.get('rut');
    this.usuario = await this.storage.getDato(this.KEY, rut);

    var geo = await this.getUbicacionActual();
    this.ubicacionDuoc.lat = geo.coords.latitude;
    this.ubicacionDuoc.lng = geo.coords.longitude;

    this.dibujarMapa();
    this.agregarMarcador();
    this.buscarDireccion(this.mapa, this.marker);
     this.getInicio(this.mapa, this.marker);

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
    var indicaciones: HTMLElement = document.getElementById('indicaciones');
    this.directionsRenderer.setPanel(indicaciones);

    this.marker = new google.maps.Marker({
      position: this.ubicacionDuoc,
      map: this.mapa
    });

  }

  //agregar un nuevo marcador al mapa:
  agregarMarcador() {
    this.marker.setPosition(this.ubicacionDestino);
    this.marker.setMap(this.mapa);
    
  }

  //método para que el input me muestre sugerencias de busqueda de dirección:
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

  //MÉTODO PARA ENCONTRAR LA RUTA ENTRE 2 DIRECCIONES:
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

  //mi ubicacion actual:
  async getUbicacionActual(): Promise<any> {
    return await new Promise(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    );
  }
  getInicio(mapaLocal, marcadorLocal) {
    var autocomplete: HTMLElement = document.getElementById('inicio');
    const search = new google.maps.places.Autocomplete(autocomplete);
    this.search = search;

    search.addListener('place_changed', function () {
      var place = search.getPlace().geometry.location;
      console.log(place)
      mapaLocal.setCenter(place);
      mapaLocal.setZoom(15);

      marcadorLocal.setPosition(place);

    });
  }
  async nuevoViaje(){
    
    var origen: any = this.ubicacionDuoc;
    var destino: any = this.ubicacionDestino;
    var capacidad: any = this.usuario.vehiculo.pasajeros;
    console.log(capacidad);
    await this.calcularRuta();
    await this.viaje.controls.origen.setValue(origen);
    await this.viaje.controls.destino.setValue(destino);
    await this.viaje.controls.capacidad.setValue(capacidad);
    var guardar = await this.storage.agregarViaje(this.KEY_VIAJES, this.viaje.value);
    if (guardar == true) {
      this.viaje.reset();
      var alert ='¡VIAJE CREADO!';
      await this.toastError(alert);
    }
  } 

  /* 
    getfinal(mapaLocal, marcadorLocal) {
      var autocomplete: HTMLElement = document.getElementById('final');
      const search = new google.maps.places.Autocomplete(autocomplete);
      this.search = search;
  
      search.addListener('place_changed', function () {
        var place = search.getPlace().geometry.location;
  
        console.log(place)
        mapaLocal.setCenter(place);
        mapaLocal.setZoom(15);
  
        marcadorLocal.setPosition(place);
  
  
  
      });
    } */

    async toastError(alerta) {
      const toast = await this.toastController.create({
        message: alerta,
        duration: 3000
      });
      toast.present();
    }
  

}





