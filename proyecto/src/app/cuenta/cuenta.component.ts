import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

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
  constructor(authService: AuthService) {
    console.log(authService.tipo);
    this.usuario = authService.usuario;
    this.tipo = authService.tipo;
    this.autenticado = authService.obtenerEstado();
    this.setSaludo();
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

  /*async verificarAlergias() {
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
      const alergias = data;
      console.log(alergias);
      this.usuario.alergias = alergias;
    }
    catch {
      console.log("Error al obtener los datos de las alergias");

    }
  }*/

}
