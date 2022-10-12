import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  rut: any;
  sesion: any = [];
  KEY = "usuarios";
  constructor(private router: Router, private route: ActivatedRoute, private usuarioService: UsuarioService,
    private navCtrl: NavController, private storage: StorageService) { }

  async ngOnInit() {
    let rut = await this.route.snapshot.paramMap.get('rut');
    this.sesion = await this.storage.getDato(this.KEY, rut);
    /*this.sesion = this.usuarioService.obtenerUsuario(rut);*/
    
  }
  
  perfil(rut){
    this.navCtrl.navigateForward(['/perfil',rut]);
  }
  administrar(rut){
    this.navCtrl.navigateForward(['/administrar',rut]);
  }
  cerrarSesion(){
    this.usuarioService.logout();
  }

  irCrearViaje(){
    var session = this.sesion;
    var navExtras: NavigationExtras = {
      state: {
        usuario: session
      }
    };
    //funciona
    console.log(navExtras.state.usuario.rut);
    this.router.navigate(['/recorrido'], navExtras);
  }

  irSolicitudViaje(){
    this.router.navigate(['/solicitud']);
  }

}
