import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  rut: string;
  password: string;
  nuevorut: string;
  constructor(private toastController: ToastController, private router: Router,
                      private usuarioService: UsuarioService, private route: ActivatedRoute, private navCtrl: NavController) { }

  ngOnInit() {
  }

  login(){
    var usuarioLogin = this.usuarioService.validarLogin(this.rut, this.password);
    if (usuarioLogin != undefined) {
      if (usuarioLogin.tipo_usuario == 'administrador') {
        this.nuevorut = this.rut;
        this.password = '';
        this.rut = '';
        this.navCtrl.navigateForward(['/home', this.nuevorut]);
        
      }else{
        this.nuevorut = this.rut;
        this.password = '';
        this.rut = '';
        this.navCtrl.navigateForward(['/home', this.nuevorut]);
      }
    } else {
        this.toastError();
      }
  }

  async toastError(){
    const toast = await this.toastController.create(
      {
        message: ' Usuario o contraseña incorrectos! ',
        duration: 3000
      }
    )
    toast.present();
  }

}