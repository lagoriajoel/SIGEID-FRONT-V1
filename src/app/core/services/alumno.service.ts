import { AboutModule } from './../../features/about/about.module';

import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../Entities/alumno';
import { AlumnoDto } from '../Entities/AlumnoDto';
import { AlumnoInformeDto } from '../Entities/AlumnoInformeDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  
 


  AlumnoURL = environment.apiURL+'/alumnos/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Alumno[]> {
    return this.httpClient.get<Alumno[]>(this.AlumnoURL + 'list');
  }

  public listarCurso(id: number): Observable<AlumnoInformeDto[]> {
    return this.httpClient.get<AlumnoInformeDto[]>(this.AlumnoURL + `listOfCurso/${id}` );
  }

  public cantidadDeAlumnosAnio(anio: string): Observable<number> {
    return this.httpClient.get<number>(this.AlumnoURL + `numAlumnosPorAnio/${anio}` );
  }
  public listarAnioCurso(anio:string, cicloLectivo: string): Observable<AlumnoInformeDto[]> {
    return this.httpClient.get<AlumnoInformeDto[]>(this.AlumnoURL + `listOfAnioCurso/${anio}/cicloLectivo/${cicloLectivo}` );
  }

  public listaPorDni(dni: string): Observable<Alumno> {
    return this.httpClient.get<Alumno>(this.AlumnoURL + `listOfDni/${dni}`);
  }

  public detail(id: number): Observable<Alumno> {
    return this.httpClient.get<Alumno>(this.AlumnoURL + `list/${id}`);
  }

 
  public save(alumno: AlumnoDto): Observable<any> {
    return this.httpClient.post<any>(this.AlumnoURL + 'save', alumno);
  }

  public update(id: number, alumno: AlumnoDto): Observable<any> {
    return this.httpClient.put<any>(this.AlumnoURL + `update/${id}`, alumno);
  }

  
  public agregarCurso(id: number, idCurso: number): Observable<any> {
    return this.httpClient.put<any>(this.AlumnoURL + `agregarCurso/${id}/cursoId/${idCurso}`, null);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.AlumnoURL + `delete/${id}`);
  }
  public deleteAlumnoCurso(id: number, idCurso:number): Observable<any> {
    return this.httpClient.delete<any>(this.AlumnoURL + `deleteAlumnoCurso/${id}/${idCurso}`);
  }

  public generarPDF(informeId: number, dniAlumno:string) {

    return this.httpClient.get(this.AlumnoURL + `pdf/${informeId}/${dniAlumno}`, {responseType: 'blob'})
  }



  uploadSingleFile(file: File, id: number): Observable<HttpEvent<{}>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    console.log(formData);
    return this.httpClient.post<any>(this.AlumnoURL +`uploadFile/${id}`, formData, { reportProgress: true, observe: 'events' });
  }

  fetchFileNames() {
    return this.httpClient
      .get<string[]>(environment.apiURL+'/getFiles');
  }
}
