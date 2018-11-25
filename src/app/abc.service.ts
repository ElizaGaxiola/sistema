import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { throwError } from 'rxjs';
import { map,catchError,retry, tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Escuela, Administrador, Docente } from './modelos';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class AbcService {

  constructor(private http: HttpClient) { }
  //ABC Docente

  //Obtener Docenetes
  getDocenetes(idEScuela:number): Observable<any>{
    return this.http.get('/api/docentes?idEscuela='+idEScuela)
      .pipe(map(result => {
        return result;
    }))  
  }
  //Actualizar Docenete
  updateDocenete (docente:Docente): Observable<any> {
    return this.http.put('/api/docenteUpdate', docente, httpOptions).pipe(
      tap(_ => console.log('updated administrador')),
      catchError(this.handleError<any>('updateAdministrador'))
    );
  }
  //Agregar Docenete
  insertDocenete (docente:Docente): Observable<any> {
    return this.http.post('/api/docenteInsert', docente, httpOptions).pipe(
      tap(_ => console.log('insert administrador')),
      catchError(this.handleError<any>('insertAdministrador'))
    );
  }
  
  //Obtener Docente
  getDocenete(idDocente: number): Observable<any>{
    return this.http.get('/api/docente?idDocente=' + idDocente)
      .pipe(map(result => {
        return result;
    }))  
  }




  //ABC Administrador
  
  //Obtener Administradores
  getAdministradoresUsuario(idUsuario:number,idEScuela:number): Observable<any>{
    return this.http.get('/api/administradoresUsuario?idUsuario='+idUsuario+'&idEscuela='+idEScuela)
      .pipe(map(result => {
        return result;
    }))  
  }

  //subir imagen 
  subirImagenAdmin(datos:any):Observable<any>{
    return this.http.post('/api/subirImagenAdmin', datos);
  }

  //Obtener Administrador
  getAdministrador(idAdministrador: number): Observable<any>{
    return this.http.get('/api/administrador?idAdministrador=' + idAdministrador)
      .pipe(map(result => {
        return result;
    }))  
  }
  //Obtener Administrador_Usuario
  getAdministrador_Usuario(idUsuario: number): Observable<any>{
    return this.http.get('/api/administradorUsuario?idUsuario=' + idUsuario)
      .pipe(map(result => {
        return result;
    }))  
  }
  
  //Obtener Administradores
  getAdministradores(): Observable<any>{
    return this.http.get('/api/administradores')
      .pipe(map(result => {
        return result;
    }))  
  }
  
  //Actualizar Administrador
  updateAdministrador (administrador:Administrador): Observable<any> {
    return this.http.put('/api/administradorUpdate', administrador, httpOptions).pipe(
      tap(_ => console.log('updated administrador')),
      catchError(this.handleError<any>('updateAdministrador'))
    );
  }
  //Agregar Administrador
  insertAdministrador (administrador:Administrador): Observable<any> {
    return this.http.post('/api/administradorInsert', administrador, httpOptions).pipe(
      tap(_ => console.log('insert administrador')),
      catchError(this.handleError<any>('insertAdministrador'))
    );
  }
  //ABC Escuela

  //Obtener Escuela
  getEscuela(clave: string): Observable<any>{
    return this.http.get('/api/escuela?clave=' + clave)
      .pipe(map(result => {
        return result;
    }))  
  }
  //Obtener Escuela por id
  getEscuela_Id(id: string): Observable<any>{
    return this.http.get('/api/escuela_ID?idEscuela=' + id)
      .pipe(map(result => {
        return result;
    }))  
  }
  
  //Obtener Escuelas
  getEscuelas(): Observable<any>{
    return this.http.get('/api/escuelas')
      .pipe(map(result => {
        return result;
    }))  
  }
  
  //Actualizar Escuela
  updateEscuela (escuela): Observable<any> {
    return this.http.put('/api/escuelaUpdate', escuela, httpOptions).pipe(
      tap(_ => console.log('updated escuela')),
      catchError(this.handleError<any>('updateEscuela'))
    );
  }
  //Agregar Escuela
  insertEscuela (escuela): Observable<any> {
    return this.http.post('/api/escuelaInsert', escuela, httpOptions).pipe(
      tap(_ => console.log('insert escuela')),
      catchError(this.handleError<any>('insertEscuela'))
    );
  }

  //ABC Seccion
  //Obtener Seccion
  getSeccion(idSeccion: number): Observable<any>{
    return this.http.get('/api/seccion?idSeccion=' + idSeccion)
      .pipe(map(result => {
        return result;
    }))  
  }
  
  //Obtener Secciones
  getSecciones(): Observable<any>{
    return this.http.get('/api/secciones')
      .pipe(map(result => {
        return result;
    }))  
  }

  //ABC Estados
  //Obtener Estado
  getEstado(idEStaado: number): Observable<any>{
    return this.http.get('/api/estado?idEstado=' + idEStaado)
      .pipe(map(result => {
        return result;
    }))  
  }
  
  //Obtener EStados
  getEstados(): Observable<any>{
    return this.http.get('/api/estados')
      .pipe(map(result => {
        return result;
    }))  
  }

  //ABC Municipios
  //Obtener Municipio
  getMunicipio(idMunicipio: number): Observable<any>{
    return this.http.get('/api/municipio?idMunicipio=' + idMunicipio)
      .pipe(map(result => {
        return result;
    }))  
  }
  
  //Obtener Municipio_Estado
  getMunicipioEdo(idEstado: number): Observable<any>{
    return this.http.get('/api/municipios_estado?idEstado=' + idEstado)
      .pipe(map(result => {
        console.log(result);
        return result;
    }))  
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
