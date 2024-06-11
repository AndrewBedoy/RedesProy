import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { DataService } from '../services/data.service';

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
  citas: any;
  expedientes: any;
  alergiaSeleccionada: number | null = null; // Variable para almacenar la alergia seleccionada

  alergiasPorPaciente = new Map<number, string[]>();
  alertService: any;
  dataService: any;
  authService: AuthService;
  currentPage: number = 1;
  itemsPerPage: number = 50;
  totalItems: number = 0;
  Math = Math; // Exponer Math como propiedad del componente

  constructor(authService: AuthService, alertService: AlertService, dataService: DataService) {
    this.usuario = authService.usuario;
    this.tipo = authService.obtenerTipo();
    this.autenticado = authService.obtenerEstado();
    this.setSaludo();
    this.alertService = alertService;
    this.dataService = dataService;
    this.authService = authService;
    if (this.tipo === 'doctor') {
      this.verPacientes();
    }
    else if(this.tipo === 'paciente') {
      this.verCitasPaciente();
      console.log("Paciente logueado");
    }
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
  alergia_descripcion: any;

  async abrirModal(paciente: any) {
    if(this.alergia_descripcion == null)
      try {
        const response = await this.dataService.getAlergia().toPromise();
        if (response) {
          this.alergia_descripcion = response;
          this.pacienteActual = paciente;
        }
      } catch (error) {
        this.alertService.mostrarAlerta('Error al obtener los datos de las alergias', 'Error', 'error');
        console.error('Error de red al iniciar sesión:', error);
      }
    
  }
  
  async verPacientes() {
    this.tabla = 'tPacientes';
    await this.verificarPacientes();
  }

  async verExpediente() {
    this.tabla = 'tExpedientes';

    try {
      const response = await this.dataService.getExpedienteMedicamento(this.authService.obtenerId()).toPromise();

      if (response) {
        this.expedientes = response;
      } else {
        console.error('Error al obtener los datos de las citas');
      }
    }
    catch (error) {
      console.error('Error de red al intentar conseguir los expedientes:', error);
    }
  }

  async verAlergiasPacientes() {
    this.tabla = 'tAlergias';
    this.alergiasPorPaciente = new Map<number, string[]>();

    await this.verificarAlergias();
    await this.verificarPacientes();

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
    }
    else{
      console.log("Error al obtener los datos de las alergias o los pacientes");
    }
  }

  async verificarAlergias() {
    this.alergias = null;
    try {
      const response = await this.dataService.getPacienteAlergia().toPromise();
      console.log(response.length);
      if (response) {
        this.alergias = response;
        this.totalItems = response.length;
        return true;
      }
      else {
        return false;
      }
    }
    catch (error){
      console.log("Error al obtener los datos de las alergias: ", error);
      return false;
    }
  }

  async verificarPacientes() {
    this.pacientes = null;
    try {
      const response = await this.dataService.getPaciente().toPromise();
      
      if (response) {
        this.pacientes = response;
        return true;
      } else {
        // this.errorInicioSesion = true;
        return false;
      }
    } catch (error) {
      console.error('Error de red al iniciar sesión:', error);
      return false;
    }
  }

  get paginatedPacientes(): any[] {
    if (!this.pacientes) {
      return [];
    }
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.pacientes.slice(start, end);
  }
  

  changePage(page: number): void {
    this.currentPage = page;
  }
  
  async registrarAlergia(idPaciente: any): Promise<void> {
    if(this.alergia_descripcion == null) {
      this.alertService.mostrarAlerta('Seleccione una alergia', 'Error', 'error');
      return;
    }

    var idAlergia: number = 0;

    if (this.alergiaSeleccionada != null) 
      idAlergia = parseInt(this.alergiaSeleccionada.toString(), 10);
    else {
      this.alertService.mostrarAlerta('Seleccione una alergia', 'Error', 'error');
      return;
    }

    if (this.alergiaSeleccionada !== null) {
      try {
        const response = await this.dataService.registrarAlergiaPaciente(idPaciente, idAlergia).toPromise();

        if (response && response.message === 'Alergia registrada exitosamente.') {
          this.alertService.mostrarAlerta('Alergia registrada correctamente', 'Registro exitoso', 'success');
        } else {
          console.error('Error al registrar la alergia (response):', response);
          this.alertService.mostrarAlerta('Error al registrar la alergia', 'Error', 'error');
        }
      } catch (error) {
        this.alertService.mostrarAlerta('Error al registrar la alergia', 'Error', 'error');
        console.error('Error al registrar la alergia (error):', error);
      }
    } else {
      this.alertService.mostrarAlerta('Alergia no encontrada', 'Error', 'error');
      console.error('Alergia no encontrada');
    }
  }

  async verCitas() {
    this.tabla = 'tCitas';
    try {
      const response = await this.dataService.getCitas(this.authService.obtenerId()).toPromise();

      if (response) {
        this.citas = response;
      } else {
        console.error('Error al obtener los datos de las citas');
      }
    }
    catch (error) {
      console.error('Error de red al intentar conseguir las citas:', error);
    }
  }

  async verCitasPaciente() {
    this.tabla = 'tCitas';
    try {
      const response = await this.dataService.getCitasPaciente(this.authService.obtenerId()).toPromise();

      if (response) {
        this.citas = response;
      } else {
        console.error('Error al obtener los datos de las citas');
      }
    }
    catch (error) {
      console.error('Error de red al intentar conseguir las citas:', error);
    }
  }
}