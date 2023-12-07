import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  usuario: any;
  usuarios: any;
  doctores: any;
  pacientes: any;
  admins: any;
  tabla: string = 'usuarios';
  constructor(authService: AuthService) {
    
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if(usuario) {
      authService.iniciarSesion(usuario);
      authService.tipo = usuario.tipo;
      console.log(usuario.tipo);
    }
    this.usuario = authService.usuario;
    this.recuperarDatos();
  }

  async recuperarDatos() {
    await this.obtenerUsuarios();
    await this.obtenerDoctores();
    await this.obtenerPacientes();
    await this.obtenerAdmins();
  }

  async obtenerUsuarios() {
    try {
      const url = 'http://192.168.50.75:3000/registros';
      const opciones = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const response = await fetch(url, opciones);
      const data = await response.json();
      this.usuarios = data;
    }
    catch {
      console.log("Error al obtener los datos de los usuarios");
    }
  }

  async obtenerDoctores() {
    try {
      const url = 'http://192.168.50.75:3000/doctores';
      const opciones = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const response = await fetch(url, opciones);
      const data = await response.json();
      this.doctores = data;
    }
    catch {
      console.log("Error al obtener los datos de los doctores");
    }
  }

  async obtenerPacientes() {
    try {
      const url = 'http://192.168.50.75:3000/pacientes';
      const opciones = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const response = await fetch(url, opciones);
      const data = await response.json();
      this.pacientes = data;
    }
    catch {
      console.log("Error al obtener los datos de los pacientes");
    }
  }

  async obtenerAdmins() {
    try {
      const url = 'http://192.168.50.75:3000/admins';
      const opciones = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const response = await fetch(url, opciones);
      const data = await response.json();
      this.admins = data;
    }
    catch {
      console.log("Error al obtener los datos de los admins");
    }
  }

}
