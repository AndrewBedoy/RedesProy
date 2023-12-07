import { Component, OnInit } from '@angular/core';
import { OpenfdaService } from '../services/openfda.service';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css']
})
export class MedicamentosComponent implements OnInit{
  nombreMedicamento: string = '';
  medicamento: any; // Aquí almacenarás la información del medicamento
  medicamentos: any[] = [];

  // Variables para la paginación
  pageSize: number = 10; // Número de elementos por página
  pageIndex: number = 0; // Página actual
  medicamentosPaginados: any[] = []; // Lista de medicamentos en la página actual

  constructor(private openfdaService: OpenfdaService) {}

  ngOnInit() {
    this.obtenerMedicamentos();
  }

  obtenerMedicamentos() {
    this.openfdaService.getMedicamentos().subscribe(
      (data) => {
        // Imprime la respuesta completa de la API en la consola
        console.log('Respuesta de la API:', data);
  
        // Verifica si existe la propiedad 'results' en la respuesta
        if ('results' in data) {
          // Imprime el array de medicamentos en la consola
          console.log('Array de Medicamentos:', data.results);
  
          // Asigna el array de medicamentos a la variable en tu componente
          this.medicamentos = data.results || [];
          this.cargarMedicamentosPaginados(); // Cargar medicamentos paginados después de obtenerlos
        } else {
          console.error('La respuesta de la API no tiene la propiedad "results".', data);
        }
      },
      (error) => {
        console.error('Error al obtener medicamentos:', error);
      }
    );
  }
  
  // Lógica para cargar los medicamentos en la página actual

  cargarMedicamentosPaginados() {
    const startIndex = this.pageIndex * this.pageSize;
    this.medicamentosPaginados = this.medicamentos.slice(startIndex, startIndex + this.pageSize);

    // Imprime el array de medicamentos paginados en la consola
    console.log('Medicamentos Paginados:', this.medicamentosPaginados);
  }


   // Lógica para mostrar los siguientes medicamentos paginados
   mostrarSiguientesMedicamentos() {
    this.pageIndex += 1;
    this.cargarMedicamentosPaginados();
  }

  // Función para cambiar de página
  cambiarPagina(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.cargarMedicamentosPaginados();
  }

  
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
