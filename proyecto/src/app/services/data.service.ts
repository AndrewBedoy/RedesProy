import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:3000'; // URL de tu backend

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/alergia`);
  }

  getUsuario(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuario`);
  }

  getPaciente(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/paciente`);
  }

  getDoctor(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/doctor`);
  }

  getAdministrador(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/administrador`);
  }

  getMedicamento(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/medicamento`);
  }

  getAlergia(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/alergia`);
  }

  getEnfermedad(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/enfermedad`);
  }

  getExpediente(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/expediente`);
  }

  getExpedienteMedicamento(idDoctor: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/expediente_medicamento/${idDoctor}`);
  }

  getCitas(idDoctor: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cita/${idDoctor}`);
  }

  getCitasPaciente(idPaciente: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cita_paciente/${idPaciente}`);
  }

  guardarCita(cita: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cita`, cita);
  }

  getPacienteAlergia(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/paciente_alergia`);
  }

  registrarAlergiaPaciente(id_paciente: number, id_alergia: number): Observable<any> {
    console.log('Registrando alergia del paciente:', id_paciente, id_alergia);
    return this.http.post<any>(`${this.apiUrl}/registrar_alergia_paciente`, { id_paciente, id_alergia });
  }
  
  iniciarSesion(correo: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { correo, contrasena });
  }

  registrarUsuario(usuario: any): Observable<any> {
    console.log('Registrarse con:', usuario);
    return this.http.post<any>(`${this.apiUrl}/registro`, usuario);
  }
}