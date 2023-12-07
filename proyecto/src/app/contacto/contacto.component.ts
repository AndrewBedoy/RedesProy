import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {

  authService: any;
  alertService: any;

  constructor(authService: AuthService, alertService: AlertService){
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    this.authService = authService;
    this.alertService = alertService;
    
    if(usuario) {
      authService.iniciarSesion(usuario);
      authService.tipo = usuario.tipo;
      console.log(usuario.tipo);
    }
  }

  mostrarCalendario() {
    console.log("mostrarCalendario1");
    const iframeContainer = document.getElementById('iframeContainer');

    console.log("mostrarCalendario");
    if(!this.authService.obtenerEstado()) {
      this.alertService.mostrarAlerta(
        'No has iniciado sesión',
        'Inicia sesión para poder agendar una cita con un administrador.',
        'warning'
      );
    }
    else if (iframeContainer) {
      if(this.authService.tipo == 'administrador' || this.authService.tipo == 'doctor'){
        const iframe = document.createElement('iframe');
        iframe.src = 'https://fabmac865.youcanbook.me/?embed=true';
        iframe.id = 'ycbm';
        iframe.style.width = '100%';
        iframe.style.height = '1000px';
        iframe.style.border = '0px';
        iframe.style.backgroundColor = 'transparent';

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
  }
}
