import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent {

  registros: any[] = [];
  mostrarLoginVar: boolean = true;
  // Inicio de sesión de doctor
  correo: string = 'smithrobert@example.com';
  contrasena: string = 'l)SP6Par)@';

  // Inicio de sesión de paciente
  // correo: string = 'richard11@example.org';
  // contrasena: string = '$DpEUYzT&4';

  // Inicio de sesión de administrador
  // correo: string = 'joshua14@example.net';
  // contrasena: string ='zm_2nOfkF_';

  // Registro
  nombre: string = 'Juan';
  apellido_p: string = 'Perez';
  apellidoMaterno: string = 'Gomez';
  direccion: string = 'Calle Ejemplo 123';
  telefono: string = '1234567890';
  idUltimoRegistro: number = 0;
  errorInicioSesion: boolean = false;

  constructor(private alertService: AlertService, private authService: AuthService, private dataService: DataService) {} // Inyecta el servicio DataService

  mostrarRegistro() {
    this.mostrarLoginVar = false;
  }

  mostrarLogin() {
    this.mostrarLoginVar = true;
  }

  async registrar() {  
    // Realizar el registro usando el servicio DataService
    try {
      // Crear el nuevo usuario
      const nuevoUsuario = {
        nombre: this.nombre,
        apellido_P: this.apellido_p,
        apellido_m: this.apellidoMaterno,
        direccion: this.direccion,
        telefono: this.telefono,
        correo: this.correo,
        contrasena: this.contrasena,
      };

      // Enviar el nuevo usuario al servidor
      const response = await this.dataService.registrarUsuario(nuevoUsuario).toPromise();
      if (response && response.message === 'Usuario y paciente registrados exitosamente.')
        this.alertService.mostrarAlertaConRedireccion(
          '¡Registro exitoso!',
          'Registro completado',
          'success',
          '/cuenta'

        );
    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);
    }
  }
  
  async iniciarSesion(): Promise<boolean> {
    try {
      const response = await this.dataService.iniciarSesion(this.correo, this.contrasena).toPromise();
      
      if (response) {
        this.errorInicioSesion = false;
        this.authService.iniciarSesion(response);
        this.alertService.mostrarAlertaConRedireccion(
          '¡Bienvenido, ' + response.nombre + '!',
          'Inicio de sesión correcto',
          'success',
          '/cuenta'
        );
        return true;
      } else {
        this.errorInicioSesion = true;
        return false;
      }
    } catch (error) {
      console.error('Error de red al iniciar sesión:', error);
      this.errorInicioSesion = true;
      return false;
    }
  }
}
