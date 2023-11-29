import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent {
  usuario: any;
  constructor(authService: AuthService) {
    this.usuario = authService.usuario;
    console.log(this.usuario);
   }

}
