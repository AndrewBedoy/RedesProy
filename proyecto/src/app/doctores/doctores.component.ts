import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
  styleUrls: ['./doctores.component.css']
})
export class DoctoresComponent {
  doctores: any[] = [];

  constructor(private authService: AuthService, private alertService: AlertService) {
    this.verDoctores();
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
    }
    catch {
      console.log("Error al obtener los datos de los doctores");

    }
  }
  mostrarIframe() {
    const iframeContainer = document.getElementById('iframeContainer');

    if(!this.authService.obtenerEstado()) {
      this.alertService.mostrarAlerta(
        'No has iniciado sesión',
        'Inicia sesión para poder agendar una cita.',
        'warning'
      );
    }
    else if (iframeContainer) {
      const iframe = document.createElement('iframe');
      iframe.src = 'https://fabmac865.youcanbook.me/?embed=true';
      iframe.id = 'ycbm';
      iframe.style.width = '100%';
      iframe.style.height = '1000px';
      iframe.style.border = '0px';
      iframe.style.backgroundColor = 'transparent';
      iframe.frameBorder = '0';

      iframeContainer.appendChild(iframe);
  
      // Ajustar la altura del iframe después de cargar
      iframe.onload = function() {
        if (iframe.contentWindow && iframe.contentWindow.document) {
          const height = iframe.contentWindow.document.body.scrollHeight + 'px';
          iframe.style.height = height;
        }
      };
    }
  }
  /*mostrarIframe() {
    //https://fabmac865.youcanbook.me/
    if(this.authService.obtenerEstado()) {
      this.alertService.mostrarAlertaConRedireccion(
        'Redirigiendo...',
        'Serás redirigido a la página de citas',
        'info',
        'https://fabmac865.youcanbook.me/'
      );
    }
  }*/


  
}
