import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-disponible',
  templateUrl: './disponible.page.html',
  styleUrls: ['./disponible.page.scss'],
})
export class DisponiblePage implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private usuarioService: UsuarioService, private storage: StorageService) { }
  usuario: any = [];
  viajes: any = [];
  conductor: any = [];
  rut: any
  KEY_VIAJE = "viajes";
  KEY_USUARIO = "usuarios";
  async ngOnInit() {
    console.log("Entre en Disponible:");
    let rut = this.route.snapshot.paramMap.get('rut');
    this.usuario = await this.storage.getDato(this.KEY_USUARIO,rut);
    console.log("Traigo al usuario en sesión:",this.usuario);
    this.viajes = await this.storage.getDatos(this.KEY_VIAJE);
    console.log("Traigo los viajes:",this.viajes);
    this.viajes.forEach(async (value, index) => {
      console.log("Entro en el foreach");
      var interna = await this.storage.getDato(this.KEY_USUARIO, value.rut_conductor);
      this.conductor.push(interna);
      console.log("Estoy imprimiendo cada dato encontrado:",interna);
    });
    console.log("Imprimo mis conductores con sus autos:", this.conductor);
  }
}
