import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent {
  usuario: any;
  tipo: string = '';
  autenticado: boolean = false;
  saludo: string = 'Hola';
  alergias: any;
  pacientes: any;
  tabla: string = 'tPacientes';

  alergiasPorPaciente = new Map<number, string[]>();
  alertService: any;

  constructor(authService: AuthService, alertService: AlertService) {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if(usuario) {
      authService.iniciarSesion(usuario);
      authService.tipo = usuario.tipo;
      console.log(usuario.tipo);
    }
    //this.usuario = authService.usuario;
    this.tipo = authService.tipo;
    this.autenticado = authService.obtenerEstado();
    this.setSaludo();
    this.alertService = alertService;
    this.usuario = authService.usuario;
    console.log(authService.tipo);
  }

  setSaludo() {
    const horaActual = new Date().getHours();

    if (horaActual >= 0 && horaActual < 12) {
      this.saludo = 'Buenos días';
    } else if (horaActual >= 12 && horaActual < 18) {
      this.saludo = 'Buenas tardes';
    } else {
      this.saludo = 'Buenas noches';
    }
  }

  pacienteActual: any;
  abrirModal(paciente: any) {
    this.pacienteActual = paciente;
  }

  async verPacientes() {
    this.tabla = 'tPacientes';
    await this.verificarPacientes();
  }

  verCitas() {
    throw new Error('Method not implemented.');
  }

  async verAlergiasPacientes() {
    this.tabla = 'tAlergias';
    await this.verificarAlergias();
    await this.verificarPacientes();

    this.alergiasPorPaciente = new Map<number, string[]>(); // Reiniciar el mapa
    if(this.alergias && this.pacientes) {
      // Llenar el mapa con las alergias de cada paciente
      this.alergias.forEach((alergia: { id_paciente: any; nombre: any; }) => {
        const idPaciente = alergia.id_paciente;
        const nombreAlergia = alergia.nombre;

        if (!this.alergiasPorPaciente.has(idPaciente)) {
          this.alergiasPorPaciente.set(idPaciente, []);
        }

        this.alergiasPorPaciente.get(idPaciente)?.push(nombreAlergia);
      });

      // Ahora alergiasPorPaciente contiene las alergias asociadas a cada paciente
      console.log(this.alergiasPorPaciente);
    }
    else{
      console.log("Error al obtener los datos de las alergias o los pacientes");
    }
  }

  async verificarAlergias() {
    try {
      const url = 'http://localhost:3000/alergias';
      const opciones = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const response = await fetch(url, opciones);
      const data = await response.json();
      this.alergias = data;
    }
    catch {
      console.log("Error al obtener los datos de las alergias");
    }
  }

  async verificarPacientes() {
    try {
      const url = 'http://localhost:3000/pacientes';
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

  async registrarAlergia(idPaciente: any): Promise<void> {
    await this.verificarAlergias();

    const nombreAlergia = document.getElementById('nombreAlergia') as HTMLInputElement;
    const descripcionAlergia = document.getElementById('descripcionAlergia') as HTMLInputElement;
    const idNuevoRegistro = this.alergias[this.alergias.length - 1].id + 1;
    
    if(nombreAlergia.value != "" && descripcionAlergia.value != "") {
      const nuevoRegistro = {
        id: idNuevoRegistro,
        nombre: nombreAlergia.value,
        descripcion: descripcionAlergia.value,
        id_paciente: idPaciente,
      };
  
      const url = 'http://localhost:3000/registrarAlergia';
      const opciones = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoRegistro)
      };
    
      try {
        const respuesta = await fetch(url, opciones);
    
        if (respuesta.ok) {
          console.log('Registro enviado al servidor.');
          this.alertService.mostrarAlerta('Registro enviado al servidor.', 'Registro exitoso', 'success');
        } else {
          console.error('Error al enviar datos al servidor:', respuesta.status);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    }
    else {
      this.alertService.mostrarAlerta('Ingresa la información en ambos campos', 'Error', 'error');
    }
  }
}