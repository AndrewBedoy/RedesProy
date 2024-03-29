import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private estaAutenticado: boolean = false;

  usuario: any;
  tipo: string = '';

  iniciarSesion(usuario: any) {
    // Lógica para iniciar sesión (puedes implementarla según tus necesidades)
    this.estaAutenticado = true;
    this.usuario = usuario;
  }

  cerrarSesion() {
    // Lógica para cerrar sesión
    this.estaAutenticado = false;
    this.usuario = null;
    this.tipo = '';
  }

  obtenerEstado(): boolean {
    return this.estaAutenticado;
  }
}