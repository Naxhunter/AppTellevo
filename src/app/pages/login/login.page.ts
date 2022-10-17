import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  KEY = "usuarios";
  rut: string;
  password: string;
  nuevorut: string;
  constructor(private toastController: ToastController, private router: Router,
    private usuarioService: UsuarioService, private route: ActivatedRoute, private navCtrl: NavController,
    private storage: StorageService, private loading: LoadingController) { }

  ngOnInit() {
  }

  async login() {
    console.log(0);
    var usuarioLogin = await this.storage.validarLogin(this.KEY, this.rut, this.password);
    console.log(usuarioLogin);
    if (usuarioLogin != undefined) {
      await this.cargarPantalla();
      this.nuevorut = this.rut;
      this.password = '';
      this.rut = '';
      var sesion = await this.storage.getDato(this.KEY, this.nuevorut);
      console.log(sesion);
      this.navCtrl.navigateForward(['/home/', this.nuevorut]);
    } else {
      await this.toastError();
    }
  }

  async toastError() {
    const toast = await this.toastController.create(
      {
        message: ' Usuario o contraseña incorrectos! ',
        duration: 3000
      }
    )
    toast.present();
  }

  async cargarPantalla(){
    const cargando = await this.loading.create(
      {
        message: 'Ingresando...',
        duration: 1000
      }
    );
    cargando.present();
  }
}