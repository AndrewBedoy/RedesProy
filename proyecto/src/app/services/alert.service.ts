import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  static mostrarAlertaConRedireccion: any;

  constructor(private router: Router) {}

  mostrarAlertaConRedireccion(titulo: string, mensaje: string, tipo: 'success' | 'error' | 'warning' | 'info', ruta: string) {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: tipo,
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed || result.isDismissed) {
        // Redirigir a la página especificada después de cerrar la alerta
        this.router.navigate([ruta]);
      }
    });
  }
  mostrarAlerta(titulo: string, mensaje: string, tipo: 'success' | 'error' | 'warning' | 'info') {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: tipo,
      confirmButtonText: 'OK',
    });
  }
}
