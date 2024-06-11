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
    if (usuario && usuario.tipo_usuario) {
      this.tipo = usuario.tipo_usuario.toLowerCase();
    } else {
      // Manejar el caso en el que usuario o usuario.tipo_usuario sea undefined
      console.error('Tipo de usuario no definido.');
    }
  }

  cerrarSesion() {
    // Lógica para cerrar sesión
    this.estaAutenticado = false;
    this.usuario = null;
    this.tipo = '';
  }

  obtenerTipo(): string {
    return this.tipo;
  }

  obtenerId(): number {
    return this.usuario.id;
  }

  obtenerEstado(): boolean {
    return this.estaAutenticado;
  }
}