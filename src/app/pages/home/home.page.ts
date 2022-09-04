import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  rut: any;
  sesion: any = [];
  constructor(private router: Router, private route: ActivatedRoute, private usuarioService: UsuarioService,
    private navCtrl: NavController) { }

  ngOnInit() {
    let rut = this.route.snapshot.paramMap.get('rut');
    this.sesion = this.usuarioService.obtenerUsuario(rut);
  }
  
  perfil(rut){
    this.navCtrl.navigateForward(['/perfil',rut]);
  }
  cerrarSesion(){
    this.router.navigate(['/login']);
  }
}
