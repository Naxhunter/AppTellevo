import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.page.html',
  styleUrls: ['./administrar.page.scss'],
})
export class AdministrarPage implements OnInit {
  rut: any;
  sesion: any = [];
  variable: string = "titulo";
  constructor(private navCtrl:NavController, private route: ActivatedRoute, private usuarioService: UsuarioService) { }

  ngOnInit() {
    let rut = this.route.snapshot.paramMap.get('rut');
    this.sesion = this.usuarioService.obtenerUsuario(rut);
  }

}
