import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { throwError } from 'rxjs';
import { map,catchError,retry, tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Escuela, Administrador, Docente, Edificio, Aula, Ciclo, Subciclo, Carrera, Periodo, Asignatura, AsignaturaPeriodo, Grupo, Horario } from './modelos';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class AbcService {

  constructor(private http: HttpClient) { }
  //ABC Horario 

  //Obtener horario
  getHorario(idHorario: number): Observable<any>{
    return this.http.get('/api/horario?idHorario='+idHorario)
      .pipe(map(result => {
        return result;
    }))  
  }

  //Delete horario 
  deleteHorario (idHorario:number): Observable<any> {
    return this.http.delete('/api/horarioDelete?idHorario='+idHorario, httpOptions).pipe(
      tap(_ => console.log('delete horario')),
      catchError(this.handleError<any>('deleteHorario'))
    );
  }

  //Obtener Horarios x Grupo
  getHorarios(idGrupo:number): Observable<any>{
    return this.http.get('/api/horarios?idGrupo='+idGrupo)
      .pipe(map(result => {
        return result;
    }))  
  }


  //Insertar Horario
  insertHorario (horario:Horario): Observable<any> {
    return this.http.post('/api/horarioInsert', horario, httpOptions).pipe(map(result => {
      return result;
    }));  
  }

  //ABC Grupos

  //Agregar grupo 
  insertGrupo (grupo:Grupo): Observable<any> {
    return this.http.post('/api/gruposInsert', grupo, httpOptions).pipe(
      tap(_ => console.log('insert grupo')),
      catchError(this.handleError<any>('insertGrupo'))
    );
  }

  //Obtener gruposTable
   getGruposTable(idEscuela:number): Observable<any>{
    return this.http.get('/api/gruposTable?idEscuela='+idEscuela)
      .pipe(map(result => {
        return result;
    }))  
  }

  //Obtener grupo
  getGrupo(idGrupo: number): Observable<any>{
    return this.http.get('/api/grupo?idGrupo='+idGrupo)
      .pipe(map(result => {
        return result;
    }))  
  }

  //Actualizar grupo
  updateGrupo (grupo:Grupo): Observable<any> {
    return this.http.put('/api/grupoUpdate', grupo, httpOptions).pipe(
      tap(_ => console.log('updated grupo')),
      catchError(this.handleError<any>('updateGrupo'))
    );
  }

  //ABC Periodo_Asignatura


  getAsignaturasPeriodo(idSeccion:number,idPeriodo:number,idCarrera:number): Observable<any>{
    return this.http.get('/api/materiasPeriodos?idSeccion='+idSeccion+'&idPeriodo='+idPeriodo+'&idCarrera='+idCarrera)
      .pipe(map(result => {
        return result;
    }))  
  }
  //Agregar asignatura 
  insertAsignaturaPeriodo (asignaturaPeriodo:AsignaturaPeriodo): Observable<any> {
    return this.http.post('/api/asignaturaPeriodoInsert', asignaturaPeriodo, httpOptions).pipe(
      tap(_ => console.log('insert asignaturaPeriodo')),
      catchError(this.handleError<any>('insertAsignaturaPeriodo'))
    );
  }

  //Delete asignatura 
  deteleAsignaturaPeriodo (idMateria:number,idSeccion:number,idPeriodo:number,idCarrera:number): Observable<any> {
    return this.http.delete('/api/asignaturaPeriodoDelete?idMateria='+idMateria+'&idSeccion='+idSeccion+'&idPeriodo='+idPeriodo+'&idCarrera='+idCarrera, httpOptions).pipe(
      tap(_ => console.log('delete asignaturaPeriodo')),
      catchError(this.handleError<any>('deteleAsignaturaPeriodo'))
    );
  }

  //ABC Asignatura

  //Obtener asignaturas
  getAsignaturas(idEscuela:number): Observable<any>{
    return this.http.get('/api/asignaturas?idEscuela='+idEscuela)
      .pipe(map(result => {
        return result;
    }))  
  }
  //Agregar asignatura 
  insertAsignatura (asignatura:Asignatura): Observable<any> {
    return this.http.post('/api/asignaturaInsert', asignatura, httpOptions).pipe(
      tap(_ => console.log('insert asignatura')),
      catchError(this.handleError<any>('insertAsignatura'))
    );
  }
  //Obtener asignatura
  getAsignatura(idAsignatura: number): Observable<any>{
    return this.http.get('/api/asignatura?idMateria='+idAsignatura)
      .pipe(map(result => {
        return result;
    }))  
  }
  
  //Actualizar asignatura
  updateAsignatura (asignatura:Asignatura): Observable<any> {
    return this.http.put('/api/asignaturaUpdate', asignatura, httpOptions).pipe(
      tap(_ => console.log('updated asignatura')),
      catchError(this.handleError<any>('updateAsignatura'))
    );
  }

  //ABC periodo

  //Obtener periodos
  getPeriodos(idEscuela:number): Observable<any>{
    return this.http.get('/api/periodos?idEscuela='+idEscuela)
      .pipe(map(result => {
        return result;
    }))  
  }
  //Agregar periodo 
  insertPeriodo (periodo:Periodo): Observable<any> {
    return this.http.post('/api/periodoInsert', periodo, httpOptions).pipe(
      tap(_ => console.log('insert periodo')),
      catchError(this.handleError<any>('insertPeriodo'))
    );
  }
  //Obtener periodo
  getPeriodo(idPeriodo: number,idSeccion:number,idCarrera:number): Observable<any>{
    return this.http.get('/api/periodo?idPeriodo='+idPeriodo+'&idSeccion='+idSeccion+'&idCarrera='+idCarrera)
      .pipe(map(result => {
        return result;
    }))  
  }
  
  //Actualizar periodo
  updatePeriodo (periodo:Periodo): Observable<any> {
    return this.http.put('/api/periodoUpdate', periodo, httpOptions).pipe(
      tap(_ => console.log('updated periodo')),
      catchError(this.handleError<any>('updatePeriodo'))
    );
  }
  //ABC   Carrera

  //Obtener Carreras
  getCarreras(idEscuela:number): Observable<any>{
    return this.http.get('/api/carreras?idEscuela='+idEscuela)
      .pipe(map(result => {
        return result;
    }))  
  }
  //Agregar Carrera 
  insertCarrera (carrera:Carrera): Observable<any> {
    return this.http.post('/api/carreraInsert', carrera, httpOptions).pipe(
      tap(_ => console.log('insert carrera')),
      catchError(this.handleError<any>('insertCarrera'))
    );
  }
  //Obtener Carrera
  getCarrera(idCarrera: number): Observable<any>{
    return this.http.get('/api/carrera?idCarrera='+idCarrera)
      .pipe(map(result => {
        return result;
    }))  
  }
  
  //Actualizar Carrera
  updateCarrera (carrera:Carrera): Observable<any> {
    return this.http.put('/api/carreraUpdate', carrera, httpOptions).pipe(
      tap(_ => console.log('updated carrera')),
      catchError(this.handleError<any>('updateCarrera'))
    );
  }

   //ABC Subciclo
  //Obtener Subciclos
  getSubCiclos_Ciclos(idCiclo:number): Observable<any>{
    return this.http.get('/api/SubCiclo_Ciclo?idCiclo='+idCiclo)
      .pipe(map(result => {
        return result;
    })) 
  }

  //Obtener Subciclos
  getSubCiclos(idEscuela:number): Observable<any>{
    return this.http.get('/api/SubCiclos?idEscuela='+idEscuela)
      .pipe(map(result => {
        return result;
    }))  
  }
  //Agregar Subciclo 
  insertSubCiclo (subciclo:Subciclo): Observable<any> {
    return this.http.post('/api/subCiclosInsert', subciclo, httpOptions).pipe(
      tap(_ => console.log('insert subCiclo')),
      catchError(this.handleError<any>('insertSubCiclo'))
    );
  }
  //Obtener Subciclo
  getSubCiclo(idCiclo: number,idSubCiclo: number): Observable<any>{
    return this.http.get('/api/SubCiclo?idCiclo=' + idCiclo+'&idSubCiclo='+idSubCiclo)
      .pipe(map(result => {
        return result;
    }))  
  }
  
  //Actualizar Subciclo
  updateSubCiclo (subciclo:Subciclo): Observable<any> {
    return this.http.put('/api/subCiclosUpdate', subciclo, httpOptions).pipe(
      tap(_ => console.log('updated subciclo')),
      catchError(this.handleError<any>('updateSubCiclo'))
    );
  }

  //ABC Ciclo

  //Obtener Ciclos
  getCiclos(idEscuela:number): Observable<any>{
    return this.http.get('/api/ciclos?idEscuela='+idEscuela)
      .pipe(map(result => {
        return result;
    }))  
  }
  //Agregar Ciclo 
  insertCiclo (ciclo:Ciclo): Observable<any> {
    return this.http.post('/api/cicloInsert', ciclo, httpOptions).pipe(
      tap(_ => console.log('insert ciclo')),
      catchError(this.handleError<any>('insertCiclo'))
    );
  }
  //Obtener Ciclo
  getCiclo(idCiclo: number): Observable<any>{
    return this.http.get('/api/ciclo?idCiclo=' + idCiclo)
      .pipe(map(result => {
        return result;
    }))  
  }
  
  //Actualizar Ciclo
  updateCiclo (ciclo:Ciclo): Observable<any> {
    return this.http.put('/api/cicloUpdate', ciclo, httpOptions).pipe(
      tap(_ => console.log('updated ciclo')),
      catchError(this.handleError<any>('updateCiclo'))
    );
  }

  //ABC Aulas

   //Obtener AulasxEdificio
   getAulasxEdificio(idEdificio:number): Observable<any>{
    return this.http.get('/api/aulasxEdificio?idEdificio='+idEdificio)
      .pipe(map(result => {
        return result;
    }))  
  }

  //Obtener Aulas
  getAulas(idEscuela:number): Observable<any>{
    return this.http.get('/api/aulas?idEscuela='+idEscuela)
      .pipe(map(result => {
        return result;
    }))  
  }

  //Agregar Aula 
  insertAula (aula:Aula): Observable<any> {
    return this.http.post('/api/aulaInsert', aula, httpOptions).pipe(
      tap(_ => console.log('insert aula')),
      catchError(this.handleError<any>('insertAula'))
    );
  }

  //Actualizar Aula
  updateAula (aula:Aula): Observable<any> {
    return this.http.put('/api/aulaUpdate', aula, httpOptions).pipe(
      tap(_ => console.log('updated aula')),
      catchError(this.handleError<any>('updateAula'))
    );
  }
  //Obtener Aula
  getAula(idAula: number): Observable<any>{
    return this.http.get('/api/aula?idAula=' + idAula)
      .pipe(map(result => {
        return result;
    }))  
  }

  //ABC Edificios

  //Obtener Edificios
  getEdificios(idEScuela:number): Observable<any>{
    return this.http.get('/api/edificios?idEscuela='+idEScuela)
      .pipe(map(result => {
        return result;
    }))  
  }

  

  //Actualizar Edificio
  updateEdificio (edificio:Edificio): Observable<any> {
    return this.http.put('/api/edificioUpdate', edificio, httpOptions).pipe(
      tap(_ => console.log('updated edificio')),
      catchError(this.handleError<any>('updateEdificio'))
    );
  }

  //Agregar Edificio 
  insertEdificio (edificio:Edificio): Observable<any> {
    return this.http.post('/api/edificioInsert', edificio, httpOptions).pipe(
      tap(_ => console.log('insert edificio')),
      catchError(this.handleError<any>('insertEdificio'))
    );
  }

  //Obtener Edificio
  getEdificio(idEdificio: number): Observable<any>{
    return this.http.get('/api/edificio?idEdificio=' + idEdificio)
      .pipe(map(result => {
        return result;
    }))  
  }


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
