import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

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
  tipo: string = 'none';
  dataService: any;
  constructor(authService: AuthService, dataService: DataService) {
    this.dataService = dataService;
    this.usuario = authService.usuario;
    console.log(this.usuario.tipo);
    this.tipo = authService.obtenerTipo();
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
      const response = await this.dataService.getUsuario().toPromise();
      this.usuarios = response;
    }
    catch {
      console.log("Error al obtener los datos de los usuarios");
    }
  }

  async obtenerDoctores() {
    try {
      const response = await this.dataService.getDoctor().toPromise();
      this.doctores = response;
    }
    catch {
      console.log("Error al obtener los datos de los doctores");
    }
  }

  async obtenerPacientes() {
    try {
      const response = await this.dataService.getPaciente().toPromise();
      this.pacientes = response;
    }
    catch {
      console.log("Error al obtener los datos de los pacientes");
    }
  }

  async obtenerAdmins() {
    try {
      const response = await this.dataService.getAdministrador().toPromise();
      this.admins = response;
    }
    catch {
      console.log("Error al obtener los datos de los administradores");
    }
  }

}
