import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
  styleUrls: ['./doctores.component.css'],
})
export class DoctoresComponent {
  doctores: any[] = [];
  usuarios: any[] = [];
  doctor: any;
  usuario: any;
  selectedDate: Date = new Date();
  selectedTime: string = '';
  numId: number = 0;
  correo: string = 'prueba@ejemplo.com';
  contrasena: string = 'contrasenaPrueba';
  combinedList: any;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private dataService: DataService
  ) {
    this.verDoctores();
    this.usuario = authService.usuario;
  }

  async verDoctores() {
    try {
      const doctores = await this.dataService.getDoctor().toPromise();
      const usuarios = await this.dataService.getUsuario().toPromise();
      console.log("#doctores", doctores.length);
      console.log("#usuarios", usuarios.length);
      this.combinedList = doctores.map((doctor: { id_usuario: any; }) => ({
        ...doctor,
        usuario: usuarios.find((usuario: { id: any; }) => usuario.id === doctor.id_usuario)
      }));
    } catch {
      console.log('Error al obtener los datos de los doctores o usuarios');
    }
  }

  horasDisponibles = [
    { value: '13:00', display: '1:00 PM' },
    { value: '14:00', display: '2:00 PM' },
    { value: '15:00', display: '3:00 PM' },
    { value: '16:00', display: '4:00 PM' },
    { value: '17:00', display: '5:00 PM' },
    { value: '18:00', display: '6:00 PM' },
    { value: '19:00', display: '7:00 PM' },
    { value: '20:00', display: '8:00 PM' },
  ];

  async capturar(index: number): Promise<void> {
    var doctor = this.doctores[index];
    const formattedDate = this.formatDate(this.selectedDate).toString();
    const userId = this.authService.usuario;

    var nuevaCita = {
      id_paciente: userId.id,
      id_doctor: doctor.id, // ID del doctor
      hora: this.selectedTime, // Hora seleccionada
      fecha: formattedDate, // Fecha seleccionada
      estado: 'P', // Estado de la cita
    };

    try {
      const respuesta = await this.dataService.guardarCita(nuevaCita).toPromise();
      if (respuesta) {
        this.alertService.mostrarAlerta(
          'Cita Agendada!',
          'Consulta tu cuenta para ver tus citas',
          'success'
        );
      } else {
        console.error('Error al enviar datos al servidor');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  }

  formatDate(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${month}/${day}/${year}`;
  }

  generarIdCita() {
    this.numId++;
    return this.numId;
  }
}
