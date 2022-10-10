import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  datos: any[] = [];

  constructor(private storage: Storage) {
    storage.create();
  }

  //MÉTODOS DEL CRUD DEL STORAGE:
  async agregar(key, dato) {
    this.datos = await this.storage.get(key) || [];

    //VAMOS A VER SI EL DATO QUE VIENE COMO PARÁMETRO TIENE id:
    //si tiene id, buscamos si existe, si NO tiene id, agregamos:
    if (dato.id == '') {
      var id = this.datos.length + 1;
      dato.id = id;
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



}
