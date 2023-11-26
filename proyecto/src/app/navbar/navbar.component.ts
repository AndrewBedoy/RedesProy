import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

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

  constructor(private authService: AuthService) {}

  

  obtenerEstado(): boolean {
    return this.authService.obtenerEstado();
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