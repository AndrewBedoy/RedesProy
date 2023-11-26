import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';

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
    console.log('Registrarse con:', this.nombre, this.apellidoPaterno, this.apellidoMaterno, this.direccion, this.telefono);

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
    this.nombre = "";
    this.apellidoPaterno = "";
    this.apellidoMaterno = "";
    this.direccion = "";
    this.telefono = "";
    this.correo = "";
    this.contrasena = "";
    alert('Registro exitoso');
  }

  cargarRegistros() {
    const registrosGuardados = localStorage.getItem('registros');
    if (registrosGuardados) {
      this.registros = JSON.parse(registrosGuardados);
    }
  }

  iniciarSesion(correo: string, contrasena: string): boolean {
    // Buscar en los registros
    const usuario = this.registros.find(registro => registro.correo === correo && registro.contrasena === contrasena);
  
    if (usuario) {
      console.log('Inicio de sesión exitoso');
      // Realizar las acciones necesarias después de un inicio de sesión exitoso
      console.log(usuario);
      return true;
    } else {
      console.log('Inicio de sesión fallido');
      // Realizar las acciones necesarias después de un inicio de sesión fallido
      return false;
    }
  }
  

}
