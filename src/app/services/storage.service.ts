import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  datos: any[] = [];
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
    return this.datos.find(dato => dato.id == identificador);
  }

  async getDatos(key) {
    this.datos = await this.storage.get(key) || [];
    return this.datos;
  }

  async eliminar(key, identificador) {
    this.datos = await this.storage.get(key) || [];

    this.datos.forEach((value, index) => {
      if (value.id == identificador) {
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

  getAuth() {
    return this.isAuthenticated.value;
  }

  logout() {
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }



}
