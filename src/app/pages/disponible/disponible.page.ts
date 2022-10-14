import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-disponible',
  templateUrl: './disponible.page.html',
  styleUrls: ['./disponible.page.scss'],
})
export class DisponiblePage implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private usuarioService: UsuarioService) { }
  usuario: any = [];
  rut: any
  ngOnInit() {
    let rut = this.route.snapshot.paramMap.get('rut');
    this.usuario = this.usuarioService.obtenerUsuario(rut);
  }
}
