import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenfdaService {
  private apiKey = 'FXBHqd4Q0ulUFLq8Kyi1DnMnomxHZTraNjCl9FpO';
  private apiUrl = 'https://api.fda.gov/drug/label.json';

  constructor(private http: HttpClient) {}

  getMedicamentoPorNombre(nombre: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '1')
      .set('search', `openfda.generic_name:${nombre}`);

    return this.http.get<any>(this.apiUrl, { headers, params });
  }
}
