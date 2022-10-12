import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  datos: any[] = [{
    id:'29dj3ksknnuf3',
    rut: '21080544-3',
    nombre: 'Gemela',
    apellido: 'Gutierrez',
    correo: 'GemelaAdmin@duocuc.cl',
    fecha_nac: '2003-08-05',
    auto: 'no',
    vehiculo: 'undefined',
    password: 'admin',
    tipo_usuario: 'administrador'
  },];
  isAuthenticated = new BehaviorSubject(false);

  constructor(private storage: Storage, private router: Router) {
    storage.create();
  }

  //MÉTODOS DEL CRUD DEL STORAGE:
  async agregar(key, dato) {
    this.datos = await this.storage.get(key) || [];
    var existe = this.datos.find(usuario => usuario.rut == dato.rut);
    if (existe == undefined) {
      this.datos.push(dato);
      await this.storage.set(key, this.datos);
      return true;
    }
    return false;
  }


  async getDato(key, identificador) {
    this.datos = await this.storage.get(key) || [];
    return this.datos.find(dato => dato.rut == identificador);
  }

  async getDatos(key) {
    this.datos = await this.storage.get(key) || [];
    return this.datos;
  }

  async eliminar(key, identificador) {
    this.datos = await this.storage.get(key) || [];

    this.datos.forEach((value, index) => {
      if (value.rut == identificador) {
        this.datos.splice(index, 1);
      }
    });

    await this.storage.set(key, this.datos);
  }

  async actualizar(key, dato) {
    this.datos = await this.storage.get(key) || [];

    var index = this.datos.findIndex(value => value.id == dato.id);
    this.datos[index] = dato;

    await this.storage.set(key, this.datos);
  }

  async validarLogin(key, rut, password): Promise<any> {
    console.log(1);
    this.datos = await this.storage.get(key) || [];
    var login = this.datos.find(usu => usu.rut == rut && usu.password == password);
    if (login != undefined) {
      console.log(2);
      this.isAuthenticated.next(true);
      return login;
    }
    else {
      console.log(3);
      return undefined;
    }
  }

  getAuth() {
    return this.isAuthenticated.value;
  }

  logout() {
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }



}
