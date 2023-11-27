import { Component } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent {

  registros: any[] = [];
  mostrarLoginVar: boolean = true;
  // Inicio de sesión
  correo: string = '';
  contrasena: string = '';
  // Registro
  nombre: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  direccion: string = '';
  telefono: string = '';

  errorInicioSesion: boolean = false;

  constructor(private alertService: AlertService, private authService: AuthService) {}

  mostrarRegistro() {
    this.mostrarLoginVar = false;
  }

  mostrarLogin() {
    this.mostrarLoginVar = true;
  }

  ngOnInit() {
    this.cargarRegistros();
  }

  registrar() {
    console.log('Registrarse con:', this.nombre, this.apellidoPaterno, 
    this.apellidoMaterno, this.direccion, this.telefono);

    // Agregar el nuevo registro al arreglo
    const nuevoRegistro = {
      nombre: this.nombre,
      apellidoPaterno: this.apellidoPaterno,
      apellidoMaterno: this.apellidoMaterno,
      direccion: this.direccion,
      telefono: this.telefono,
      correo: this.correo,
      contrasena: this.contrasena
    };
    this.registros.push(nuevoRegistro);

    this.guardarRegistros();
  }

  guardarRegistros() {
    localStorage.setItem('registros', JSON.stringify(this.registros));

    this.alertService.mostrarAlerta('¡Bienvenido, '  + this.nombre + '!', 
    'Tu cuenta ha sido registrada correctamente', 'success');

    this.nombre = "";
    this.apellidoPaterno = "";
    this.apellidoMaterno = "";
    this.direccion = "";
    this.telefono = "";
    this.correo = "";
    this.contrasena = "";
  }

  cargarRegistros() {
    const registrosGuardados = localStorage.getItem('registros');
    if (registrosGuardados) {
      this.registros = JSON.parse(registrosGuardados);
    }
  }

  iniciarSesion(): boolean {
    // Buscar en los registros
    const usuario = this.registros.find(registro => registro.correo === this.correo 
      && registro.contrasena === this.contrasena);
  
    if (usuario) {
      this.errorInicioSesion = false;
      this.authService.iniciarSesion();
      this.alertService.mostrarAlertaConRedireccion('Bienvenido, ' +
        usuario.nombre + '!', 'Inicio de sesión correcto', 'success', '/cuenta');
      return true;
    } else {
      this.authService.cerrarSesion();
      this.errorInicioSesion = true;
      return false;
    }
  }
}
