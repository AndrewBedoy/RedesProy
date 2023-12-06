import { Component, OnInit } from '@angular/core';
import { OpenfdaService } from '../services/openfda.service';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css']
})
export class MedicamentosComponent {
  nombreMedicamento: string = '';
  medicamento: any; // Aquí almacenarás la información del medicamento

  constructor(private openfdaService: OpenfdaService) {}

  buscarMedicamento() {
    if (this.nombreMedicamento) {
      this.openfdaService.getMedicamentoPorNombre(this.nombreMedicamento).subscribe(
        (data) => {
          this.medicamento = data.results[0];
        },
        (error) => {
          console.error('Error al buscar el medicamento:', error);
        }
      );
    }
  }
}
