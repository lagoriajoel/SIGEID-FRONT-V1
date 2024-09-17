import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { contenido } from '../Entities/Contenido';
import { environment } from 'src/environments/environment';
import { contenidoAdeudadoDto } from '../Entities/contenidoAdeudadoDto';

@Injectable({
  providedIn: 'root'
})
export class ContenidosService {

  ContenidoURL = environment.apiURL+'/contenidos/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<contenido[]> {
    return this.httpClient.get<contenido[]>(this.ContenidoURL + 'list');
  }

  public listarContenido(id: number): Observable<contenido[]> {
    return this.httpClient.get<contenido[]>(this.ContenidoURL + `list/${id}` );
  }
  //cambio contenido por contenido Dto
  public listarContenidoPorAsignatura(idAsignatura: number): Observable<contenidoAdeudadoDto[]> {
    return this.httpClient.get<contenidoAdeudadoDto[]>(this.ContenidoURL + `listOfAsignatura/${idAsignatura}` );
  }

  public detail(id: number): Observable<contenido> {
    return this.httpClient.get<contenido>(this.ContenidoURL + `list/${id}`);
  }

 
  public save(contenido: contenido): Observable<any> {
    return this.httpClient.post<any>(this.ContenidoURL + 'save', contenido);
  }

  public update(id: number, contenido: contenido): Observable<any> {
    return this.httpClient.put<any>(this.ContenidoURL + `update/${id}`, contenido);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.ContenidoURL + `delete/${id}`);
  }
}
