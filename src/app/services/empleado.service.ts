import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

interface Empleado {
  telefono: any;
  email: any;
  departamento: any;
  id?: string;
  nombre: string;
  puesto: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private readonly baseUri: string = 'https://backend-qxu7.onrender.com/api'; //http://localhost:4000
  private readonly headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  agreEmpleado(data: Empleado): Observable<Empleado> {
    const url = `${this.baseUri}/agregar`;
    return this.http.post<Empleado>(url, data, { headers: this.headers })
      .pipe(catchError(this.errorManager));
  }

  getEmpleados(): Observable<Empleado[]> {
    const url = `${this.baseUri}/empleados`;
    return this.http.get<Empleado[]>(url, { headers: this.headers });
  }

  getEmpleado(id: string): Observable<Empleado> {
    const url = `${this.baseUri}/empleado/${id}`;
    return this.http.get<Empleado>(url, { headers: this.headers }).pipe(
      map((res: any) => res || {}),
      catchError(this.errorManager)
    );
  }

  actuEmpleado(id: string, data: Partial<Empleado>): Observable<Empleado> {
    const url = `${this.baseUri}/actualizar/${id}`;
    return this.http.put<Empleado>(url, data, { headers: this.headers })
      .pipe(catchError(this.errorManager));
  }

  eliEmpleado(id: string): Observable<any> {
    const url = `${this.baseUri}/eliminar/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .pipe(catchError(this.errorManager));
  }

  private errorManager(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      errorMessage = `Error del servidor: 
        Código: ${error.status}
        Mensaje: ${error.message}
        Detalles: ${error.error?.message || 'No disponible'}`;
    }
    
    console.error('Error en servicio Empleado:', errorMessage, error);
    return throwError(() => ({
      message: errorMessage,
      originalError: error
    }));
  }
}