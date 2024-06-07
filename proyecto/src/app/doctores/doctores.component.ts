import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { PickerInteractionMode } from 'igniteui-angular';
import { Time } from '@angular/common';
import { TimeFormatPipe } from 'igniteui-angular/lib/time-picker/time-picker.pipes';


@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
  styleUrls: ['./doctores.component.css'],
})
export class DoctoresComponent {
  doctores: any[] = [];

  selectedDate!: Date;
  selectedTime: string = '';
  numId: number = 0;
  correo: string = 'prueba@ejemplo.com';
  contrasena: string = 'contrasenaPrueba';
  usuario: any;
  public mode: PickerInteractionMode = PickerInteractionMode.DropDown;
  public format = 'hh:mm tt';

  constructor(
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.verDoctores();
    this.selectedDate = new Date(); // Asegúrate de inicializarlas aquí o en algún otro lugar necesario
    this.usuario = authService.usuario;
  }

  // leer el archivo json de usuarios y doctores y mostrarlos en la tabla
  async verDoctores() {
    try {

      const url = 'http://localhost:3000/doctores';

      const opciones = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };


      const response = await fetch(url, opciones);
      const data = await response.json();
      this.doctores = data;
    } catch {
      console.log('Error al obtener los datos de los doctores');
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

  async capturar(index: number):  Promise<void> {
    var doctor = this.doctores[index];
   
    
    const formattedDate = this.formatDate(this.selectedDate).toString();
    const userId = this.authService.usuario;

    var nuevaCita = {
      id: this.generarIdCita(), // Generar ID de la cita
      id_paciente: userId.id,
      id_doctor: doctor.id, // ID del doctor
      hora: this.selectedTime, //Hora seleccionada
      fecha: formattedDate, // Fecha seleccionada
      estado: 'P', // estado de la cita
    };

    const url = 'http://192.168.0.26:3000/guardarCita';
    console.log(nuevaCita);
      const opciones = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaCita)
      };
   
      try {
        const respuesta = await fetch(url, opciones);
   
        if (respuesta.ok) {
          this.alertService.mostrarAlerta(
            'Cita Agendada!' ,
            'consulta tu cuenta para ver tus citas',
            'success'
            
          );
        } else {
          console.error('Error al enviar datos al servidor:', respuesta.status);
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
