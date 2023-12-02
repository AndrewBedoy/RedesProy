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
  correo: string = 'prueba@ejemplo.com';
  contrasena: string = 'contrasenaPrueba';
  // Registro
  nombre: string = 'Juan';
  apellido_p: string = 'Perez';
  apellidoMaterno: string = 'Gomez';
  direccion: string = 'Calle Ejemplo 123';
  telefono: string = '1234567890';
  idUltimoRegistro: number = 0;
  errorInicioSesion: boolean = false;

  constructor(private alertService: AlertService, private authService: AuthService) {}

  mostrarRegistro() {
    this.mostrarLoginVar = false;
  }

  mostrarLogin() {
    this.mostrarLoginVar = true;
  }

  async enviarDatosAlServidor(datos: any): Promise<void> {
    const url = 'http://172.16.113.156:3000/registro';
    const opciones = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    };
  
    try {
      const respuesta = await fetch(url, opciones);
  
      if (respuesta.ok) {
        console.log('Registro enviado al servidor.');
        alert('Registro enviado al servidor.');
      } else {
        console.error('Error al enviar datos al servidor:', respuesta.status);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  }
  
  async registrar() {
    console.log('Registrarse con:', this.nombre, this.apellido_p, this.apellidoMaterno, this.direccion, this.telefono);
  
    try {
      const url = 'http://172.16.113.156:3000/registro/idUltimoRegistro';
      const opciones = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const response = await fetch(url, opciones);
      const data = await response.json();
  
      if (response.ok) {
        console.log('ID del último registro:', data.id);
        this.idUltimoRegistro = data.id;
      } else {
        console.error('Error al obtener ID del último registro:', response.status);
      }
    } catch (error) {
      console.error('Error de red al obtener ID del último registro:', error);
    }
  
    // ternario para asignar el id del ultimo registro
    this.idUltimoRegistro = this.idUltimoRegistro == null ? 0 : this.idUltimoRegistro + 1;
    console.log('ID del nuevo registro:', this.idUltimoRegistro);
  
    const datosAEnviar = {
      id: this.idUltimoRegistro,
      nombre: this.nombre,
      apellido_p: this.apellido_p,
      apellido_m: this.apellidoMaterno,
      direccion: this.direccion,
      telefono: this.telefono,
      correo: this.correo,
      contrasena: this.contrasena,
    };
  
    await this.enviarDatosAlServidor(datosAEnviar);
  }
  
  async iniciarSesion(): Promise<boolean> {
    try {
      // Realizar una solicitud al servidor para obtener los registros.
      const url = 'http://172.16.113.156:3000/registros'; // Reemplaza con la URL correcta de tu servidor.
      const opciones = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const response = await fetch(url, opciones);
      const registros = await response.json();
  
      if (!response.ok) {
        console.error('Error al obtener registros del servidor:', response.status);
        return false;
      }

      // Buscar en los registros
      const usuario = registros.find(
        (registro: { correo: string; contrasena: string; }) => 
          registro.correo === this.correo && registro.contrasena === this.contrasena
      );

      if (usuario) {
        this.errorInicioSesion = false;
        this.authService.iniciarSesion(usuario);
        this.alertService.mostrarAlertaConRedireccion(
          '¡Bienvenido, ' + usuario.nombre + '!',
          'Inicio de sesión correcto',
          'success',
          '/cuenta'
        );

        // Verificar el tipo de usuario
        try {
          const esAdmin = await this.obtenerAdministradores(usuario.id, usuario);
          const esDoctor = await this.obtenerDoctores(usuario.id, usuario);
          if (!esAdmin && !esDoctor) {
            this.authService.tipo = 'paciente';
            console.log('El usuario es paciente');
          }
        } catch (error) {
          console.error('Error al verificar el tipo de usuario:', error);
          // Manejar el error según sea necesario
        }

        return true;
      } else {
        this.authService.cerrarSesion();
        this.errorInicioSesion = true;
        return false;
      }
    } catch (error) {
      console.error('Error de red al iniciar sesión:', error);
      return false;
    }
  }

  async obtenerAdministradores(idUsuario: number, usuario: any): Promise<boolean> {
    try {
      const url = `http://172.16.113.156:3000/administradores/${idUsuario}`;
      const response = await fetch(url);
      const data = await response.json();
  
      if (response.ok) {
        if (data.esAdministrador) {
          console.log('El usuario es administrador');
          this.authService.iniciarSesion(usuario);
          this.authService.tipo = 'administrador';
          return true;
        }
        else{
          return true;
        }
      } else {
        console.error('Error en la respuesta del servidor:', response.status);
        throw new Error('Error en la respuesta del servidor');
      }
    } catch (error) {
      console.error('Error al obtener información de administradores:', error);
      this.authService.cerrarSesion();
      this.alertService.mostrarAlerta('Error al iniciar sesión', 'Error', 'error');
      throw error; // Propagar el error para que la función llamadora pueda manejarlo
    }
  }
  

  async obtenerDoctores(idUsuario: number, usuario: any): Promise<boolean> {
    try {
      const url = `http://172.16.113.156:3000/doctores/${idUsuario}`;
      const response = await fetch(url);
      const data = await response.json();
  
      if (response.ok) {
        if (data.esDoctor) {
          console.log('El usuario es doctor');
          this.authService.iniciarSesion(usuario);
          this.authService.tipo = 'doctor';
          return true;
        }
        else{
          return true;
        }
      } else {
        console.error('Error en la respuesta del servidor:', response.status);
        throw new Error('Error en la respuesta del servidor');
      }
    } catch (error) {
      console.error('Error al obtener información de doctores:', error);
      this.authService.cerrarSesion();
      this.alertService.mostrarAlerta('Error al iniciar sesión', 'Error', 'error');
      throw error; // Propagar el error para que la función llamadora pueda manejarlo
    }
  }
  
    
}
