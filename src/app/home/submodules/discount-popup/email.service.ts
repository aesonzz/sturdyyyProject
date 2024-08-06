import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  // Cargamos la URL de la API en el environment
  private apiUrl = environment.serverURL;

// Inyectamos el HTTPClient service para hacer peticiones http
  constructor(private http: HttpClient) { }

  //Método para enviar el correo con una llamada a la API que recibe un correo y envía un observable con la respuesta

  sendEmail(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/send-email`, { email });
  }
}
