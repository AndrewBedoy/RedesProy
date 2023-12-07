import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  correo: string = 'correo@gmail.com';
  contrasena: string = '123456';
  usuario: string = 'Usuario';
  rol: string = 'Paciente';
  
  esAdmin: boolean = false;

  constructor(public authService: AuthService,
    private router: Router) {
      const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
      if(usuario) {
        authService.iniciarSesion(usuario);
        authService.tipo = usuario.tipo;
      }
      else {
        console.log('No hay usuario');
      }
    }

  obtenerEstado(): boolean {
    return this.authService.obtenerEstado();
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.router.navigate(['/']);
    localStorage.removeItem('usuario');
  }

  esAdministrador() {
    this.esAdmin = true;
  }

  esPaciente() {
    this.esAdmin = false;
  }

  esMedico() {
    this.esAdmin = false;
  }



}