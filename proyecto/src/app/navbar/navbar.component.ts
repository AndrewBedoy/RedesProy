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
    private router: Router) {}



  obtenerEstado(): boolean {
    return this.authService.obtenerEstado();
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.router.navigate(['/']);
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