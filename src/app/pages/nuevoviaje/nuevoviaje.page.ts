import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-nuevoviaje',
  templateUrl: './nuevoviaje.page.html',
  styleUrls: ['./nuevoviaje.page.scss'],
})
export class NuevoviajePage implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private usuarioService: UsuarioService) { }
  usuario: any = [];
  rut: any
  ngOnInit() {
    /*this.usuario = this.router.getCurrentNavigation().extras.state.usuario;*/
    let rut = this.route.snapshot.paramMap.get('rut');
    this.usuario = this.usuarioService.obtenerUsuario(rut);
  }

}
