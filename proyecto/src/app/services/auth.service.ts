import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private estaAutenticado: boolean = false;

  iniciarSesion() {
    // Lógica para iniciar sesión (puedes implementarla según tus necesidades)
    this.estaAutenticado = true;
  }

  cerrarSesion() {
    // Lógica para cerrar sesión
    this.estaAutenticado = false;
  }

  obtenerEstado(): boolean {
    return this.estaAutenticado;
  }
}
