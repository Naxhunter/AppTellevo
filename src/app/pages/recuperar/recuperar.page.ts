import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
    rut: string;
    correo: string;

  constructor(private usuarioService: UsuarioService, private router: Router, private toastController:ToastController) { }

  ngOnInit() {
  }

 usuarioRecuperar(){
  let usuarioRecuperado = this.usuarioService.validarRecuperar(this.rut, this.correo);

  if (usuarioRecuperado == true ) {
    this.router.navigate(['/login']);
  }else{
    this.toastError();
  }
 }
 async toastError() {
  const toast = await this.toastController.create({
    message: 'USUARIO O CORREO NO COINCIDEN',
    duration: 3000
  });
  toast.present();
}

}
