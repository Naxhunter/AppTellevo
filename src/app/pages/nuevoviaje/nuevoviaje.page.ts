import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-nuevoviaje',
  templateUrl: './nuevoviaje.page.html',
  styleUrls: ['./nuevoviaje.page.scss'],
})
export class NuevoviajePage implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }
  usuario: any = [];
  ngOnInit() {
    this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
  }

}
