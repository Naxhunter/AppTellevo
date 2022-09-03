import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  rut: any;
  sesion: any = [];
  constructor(private router: Router, private route: ActivatedRoute, private usuarioService: UsuarioService) { }

  ngOnInit() {
    let rut = this.route.snapshot.paramMap.get('rut');
    this.sesion = this.usuarioService.obtenerUsuario(rut);
  }
  
  /*
  traerSesion(){
    this.sub = this.route.params.subscribe(params => {
    this.rut = params['rut']; 
  })};*/

  cerrarSesion(){
    this.router.navigate(['/login']);
  }
}
