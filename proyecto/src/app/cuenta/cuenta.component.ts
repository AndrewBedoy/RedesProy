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
  constructor(authService: AuthService) {
    console.log(authService.tipo);
    this.usuario = authService.usuario;
    this.tipo = authService.tipo;
    this.autenticado = authService.obtenerEstado();
   }

}
