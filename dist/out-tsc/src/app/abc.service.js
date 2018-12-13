var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
var httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};
var AbcService = /** @class */ (function () {
    function AbcService(http) {
        this.http = http;
    }
    //ABC ConfCal
    //Obtener candidato Curp
    AbcService.prototype.getCalificacionesAlumno = function (idAlumno, idCiclo, idSubciclo) {
        return this.http.get('/api/calificacionesAlumno?idAlumno=' + idAlumno + '&idCiclo=' + idCiclo + '&idSubciclo=' + idSubciclo)
            .pipe(map(function (result) {
            return result;
        }));
    };
    AbcService.prototype.getGruposAlumno = function (idAlumno) {
        return this.http.get('/api/GrupoA?idAlumno=' + idAlumno)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Obtener ConfCal
    AbcService.prototype.getCals = function (idEScuela) {
        return this.http.get('/api/cals?idEscuela=' + idEScuela)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Actualizar ConfCal
    AbcService.prototype.updateCal = function (cal) {
        return this.http.put('/api/calUpdate', cal, httpOptions).pipe(tap(function (_) { return console.log('updated confCal'); }), catchError(this.handleError('updateCal')));
    };
    //Agregar ConfCal 
    AbcService.prototype.insertCal = function (cal) {
        return this.http.post('/api/calInsert', cal, httpOptions).pipe(tap(function (_) { return console.log('insert confCal'); }), catchError(this.handleError('insertCal')));
    };
    //Obtener ConfCal
    AbcService.prototype.getCal = function (idConfCalificacion) {
        return this.http.get('/api/cal?idConfCalificacion=' + idConfCalificacion)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Subir calificacion
    AbcService.prototype.insertCalificacion = function (calificacion) {
        return this.http.post('/api/calificacionInsert', calificacion);
    };
    //Obtener calificacion
    AbcService.prototype.getCalificacion = function (idConfCalificacion, idGrupo, idAlumno) {
        return this.http.get('/api/calificacion?idConfCalificacion=' + idConfCalificacion + '&idAlumno=' + idAlumno + '&idGrupo=' + idGrupo)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //ABC ALUMNOS
    //Actualizar contraseña alumno
    AbcService.prototype.updateContrAlumno = function (data) {
        return this.http.put('/api/contraAlumnoUpdate', data, httpOptions).pipe(tap(function (_) { return console.log('updated'); }), catchError(this.handleError('updateContrAlumno')));
    };
    //Actualizar Aviso
    AbcService.prototype.updateImagenAlumno = function (data) {
        return this.http.put('/api/AlumnoUpdate', data, httpOptions).pipe(tap(function (_) { return console.log('updated'); }), catchError(this.handleError('updateImagenAlumno')));
    };
    //subir imagen aspirante
    AbcService.prototype.subirImagenAlumno = function (datos) {
        return this.http.post('/api/subirImagenAlumno', datos);
    };
    //Obtener alumno
    AbcService.prototype.getAlumnoUsuario = function (idUsuario) {
        return this.http.get('/api/alumnoUsuario?idUsuario=' + idUsuario)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Obtener alumno
    AbcService.prototype.getAlumno = function (idAlumno) {
        return this.http.get('/api/alumno?idAlumno=' + idAlumno)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Obtener tutor
    AbcService.prototype.getActa = function (idSeccion, idPeriodo, idCarrera) {
        return this.http.get('/api/acta?idSeccion=' + idSeccion + '&idPeriodo=' + idPeriodo + '&idCarrera=' + idCarrera)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Obtener alumnos
    AbcService.prototype.getAlumnosxGrupo = function (idGrupo) {
        return this.http.get('/api/alumnosG?idGrupo=' + idGrupo)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //subir inscripcion
    AbcService.prototype.reinsertIscripcion = function (datos) {
        return this.http.post('/api/reinscripcionInsert', datos);
    };
    //Obtener tutor
    AbcService.prototype.getTutorAlumno = function (idAlumno) {
        return this.http.get('/api/tutorAlumno?idAlumno=' + idAlumno)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Obtener alumno mat
    AbcService.prototype.getAlumnoMat = function (idMatricula) {
        return this.http.get('/api/alumnoMatricula?mat=' + idMatricula)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //ABC Avisos
    //Obtener Avisos Activos
    AbcService.prototype.getAvisosAct = function (idEScuela) {
        return this.http.get('/api/avisosAct?idEscuela=' + idEScuela)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Delete horario 
    AbcService.prototype.deleteAviso = function (idAviso) {
        return this.http.delete('/api/avisoDelete?idAviso=' + idAviso, httpOptions).pipe(tap(function (_) { return console.log('delete aviso'); }), catchError(this.handleError('deleteAviso')));
    };
    //Obtener Avisos
    AbcService.prototype.getAvisos = function (idEScuela) {
        return this.http.get('/api/avisos?idEscuela=' + idEScuela)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Actualizar Aviso
    AbcService.prototype.updateAviso = function (aviso) {
        return this.http.put('/api/avisoUpdate', aviso, httpOptions).pipe(tap(function (_) { return console.log('updated aviso'); }), catchError(this.handleError('updateAviso')));
    };
    //Agregar Aviso 
    AbcService.prototype.insertAviso = function (aviso) {
        return this.http.post('/api/avisoInsert', aviso, httpOptions).pipe(tap(function (_) { return console.log('insert Aviso'); }), catchError(this.handleError('insertAviso')));
    };
    //Obtener Aviso
    AbcService.prototype.getAviso = function (idAviso) {
        return this.http.get('/api/aviso?idAviso=' + idAviso)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //ABC Preinscripcion
    //subir inscripcion
    AbcService.prototype.insertIscripcion = function (datos) {
        return this.http.post('/api/inscripcionInsert', datos);
    };
    //Obtener candidato Curp
    AbcService.prototype.getTutorCandidato = function (idCandidato) {
        return this.http.get('/api/tutorCandidato?idCandidato=' + idCandidato)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Obtener candidato Curp
    AbcService.prototype.getCandidatoCurp = function (curp, idEscuela) {
        return this.http.get('/api/candidatoCurp?curp=' + curp + '&idEscuela=' + idEscuela)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Obtener candidato
    AbcService.prototype.getCandidato = function (idCandidato) {
        return this.http.get('/api/candidato?idCandidato=' + idCandidato)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //subir preinscripción
    AbcService.prototype.insertPreinscripcion = function (datos) {
        return this.http.post('/api/preinscripcionInsert', datos);
    };
    //subir imagen aspirante
    AbcService.prototype.subirImagenAsp = function (datos) {
        return this.http.post('/api/subirImagen', datos);
    };
    //subir doc 
    AbcService.prototype.subirDoc = function (datos) {
        return this.http.post('/api/subirdoc', datos);
    };
    //ABC Horario 
    //Obtener grupos Inscripcion
    AbcService.prototype.getGruposIns = function (idCiclo, idSubCiclo, idSeccion, idPeriodo, idCarrera) {
        return this.http.get('/api/gruposIns?idCiclo=' + idCiclo + '&idSubCiclo=' + idSubCiclo + '&idSeccion=' + idSeccion + '&idPeriodo=' + idPeriodo + '&idCarrera=' + idCarrera)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Actualizar grupo
    AbcService.prototype.updateHorario = function (horario) {
        return this.http.put('/api/horarioUpdate', horario, httpOptions).pipe(map(function (result) {
            return result;
        }));
    };
    //Obtener horario
    AbcService.prototype.getHorario = function (idHorario) {
        return this.http.get('/api/horario?idHorario=' + idHorario)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Delete horario 
    AbcService.prototype.deleteHorario = function (idHorario) {
        return this.http.delete('/api/horarioDelete?idHorario=' + idHorario, httpOptions).pipe(tap(function (_) { return console.log('delete horario'); }), catchError(this.handleError('deleteHorario')));
    };
    //Obtener Horarios x Grupo
    AbcService.prototype.getHorarios = function (idGrupo) {
        return this.http.get('/api/horarios?idGrupo=' + idGrupo)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Insertar Horario
    AbcService.prototype.insertHorario = function (horario) {
        return this.http.post('/api/horarioInsert', horario, httpOptions).pipe(map(function (result) {
            return result;
        }));
    };
    //ABC Grupos
    //Obtener grupos x docente
    AbcService.prototype.getGruposDocente = function (idDocente) {
        return this.http.get('/api/gruposDocente?idDocente=' + idDocente)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Agregar grupo 
    AbcService.prototype.insertGrupo = function (grupo) {
        return this.http.post('/api/gruposInsert', grupo, httpOptions).pipe(tap(function (_) { return console.log('insert grupo'); }), catchError(this.handleError('insertGrupo')));
    };
    //Obtener gruposTable
    AbcService.prototype.getGruposTable = function (idEscuela) {
        return this.http.get('/api/gruposTable?idEscuela=' + idEscuela)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Obtener grupo
    AbcService.prototype.getGrupo = function (idGrupo) {
        return this.http.get('/api/grupo?idGrupo=' + idGrupo)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Actualizar grupo
    AbcService.prototype.updateGrupo = function (grupo) {
        return this.http.put('/api/grupoUpdate', grupo, httpOptions).pipe(tap(function (_) { return console.log('updated grupo'); }), catchError(this.handleError('updateGrupo')));
    };
    //ABC Periodo_Asignatura
    AbcService.prototype.getAsignaturasPeriodo = function (idSeccion, idPeriodo, idCarrera) {
        return this.http.get('/api/materiasPeriodos?idSeccion=' + idSeccion + '&idPeriodo=' + idPeriodo + '&idCarrera=' + idCarrera)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Agregar asignatura 
    AbcService.prototype.insertAsignaturaPeriodo = function (asignaturaPeriodo) {
        return this.http.post('/api/asignaturaPeriodoInsert', asignaturaPeriodo, httpOptions).pipe(tap(function (_) { return console.log('insert asignaturaPeriodo'); }), catchError(this.handleError('insertAsignaturaPeriodo')));
    };
    //Delete asignatura 
    AbcService.prototype.deteleAsignaturaPeriodo = function (idMateria, idSeccion, idPeriodo, idCarrera) {
        return this.http.delete('/api/asignaturaPeriodoDelete?idMateria=' + idMateria + '&idSeccion=' + idSeccion + '&idPeriodo=' + idPeriodo + '&idCarrera=' + idCarrera, httpOptions).pipe(tap(function (_) { return console.log('delete asignaturaPeriodo'); }), catchError(this.handleError('deteleAsignaturaPeriodo')));
    };
    //ABC Asignatura
    //Obtener asignaturas
    AbcService.prototype.getAsignaturas = function (idEscuela) {
        return this.http.get('/api/asignaturas?idEscuela=' + idEscuela)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Agregar asignatura 
    AbcService.prototype.insertAsignatura = function (asignatura) {
        return this.http.post('/api/asignaturaInsert', asignatura, httpOptions).pipe(tap(function (_) { return console.log('insert asignatura'); }), catchError(this.handleError('insertAsignatura')));
    };
    //Obtener asignatura
    AbcService.prototype.getAsignatura = function (idAsignatura) {
        return this.http.get('/api/asignatura?idMateria=' + idAsignatura)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Actualizar asignatura
    AbcService.prototype.updateAsignatura = function (asignatura) {
        return this.http.put('/api/asignaturaUpdate', asignatura, httpOptions).pipe(tap(function (_) { return console.log('updated asignatura'); }), catchError(this.handleError('updateAsignatura')));
    };
    //ABC periodo
    //Obtener periodos
    AbcService.prototype.getPeriodos = function (idEscuela) {
        return this.http.get('/api/periodos?idEscuela=' + idEscuela)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Agregar periodo 
    AbcService.prototype.insertPeriodo = function (periodo) {
        return this.http.post('/api/periodoInsert', periodo, httpOptions).pipe(tap(function (_) { return console.log('insert periodo'); }), catchError(this.handleError('insertPeriodo')));
    };
    //Obtener periodo
    AbcService.prototype.getPeriodo = function (idPeriodo, idSeccion, idCarrera) {
        return this.http.get('/api/periodo?idPeriodo=' + idPeriodo + '&idSeccion=' + idSeccion + '&idCarrera=' + idCarrera)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Actualizar periodo
    AbcService.prototype.updatePeriodo = function (periodo) {
        return this.http.put('/api/periodoUpdate', periodo, httpOptions).pipe(tap(function (_) { return console.log('updated periodo'); }), catchError(this.handleError('updatePeriodo')));
    };
    //ABC   Carrera
    //Obtener Carreras
    AbcService.prototype.getCarreras = function (idEscuela) {
        return this.http.get('/api/carreras?idEscuela=' + idEscuela)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Agregar Carrera 
    AbcService.prototype.insertCarrera = function (carrera) {
        return this.http.post('/api/carreraInsert', carrera, httpOptions).pipe(tap(function (_) { return console.log('insert carrera'); }), catchError(this.handleError('insertCarrera')));
    };
    //Obtener Carrera
    AbcService.prototype.getCarrera = function (idCarrera) {
        return this.http.get('/api/carrera?idCarrera=' + idCarrera)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Actualizar Carrera
    AbcService.prototype.updateCarrera = function (carrera) {
        return this.http.put('/api/carreraUpdate', carrera, httpOptions).pipe(tap(function (_) { return console.log('updated carrera'); }), catchError(this.handleError('updateCarrera')));
    };
    //ABC Subciclo
    //Obtener Subciclos
    AbcService.prototype.getSubCiclos_Ciclos = function (idCiclo) {
        return this.http.get('/api/SubCiclo_Ciclo?idCiclo=' + idCiclo)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Obtener Subciclos
    AbcService.prototype.getSubCiclos = function (idEscuela) {
        return this.http.get('/api/SubCiclos?idEscuela=' + idEscuela)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Agregar Subciclo 
    AbcService.prototype.insertSubCiclo = function (subciclo) {
        return this.http.post('/api/subCiclosInsert', subciclo, httpOptions).pipe(tap(function (_) { return console.log('insert subCiclo'); }), catchError(this.handleError('insertSubCiclo')));
    };
    //Obtener Subciclo
    AbcService.prototype.getSubCiclo = function (idCiclo, idSubCiclo) {
        return this.http.get('/api/SubCiclo?idCiclo=' + idCiclo + '&idSubCiclo=' + idSubCiclo)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Actualizar Subciclo
    AbcService.prototype.updateSubCiclo = function (subciclo) {
        return this.http.put('/api/subCiclosUpdate', subciclo, httpOptions).pipe(tap(function (_) { return console.log('updated subciclo'); }), catchError(this.handleError('updateSubCiclo')));
    };
    //ABC Ciclo
    //Obtener Ciclos
    AbcService.prototype.getCiclos = function (idEscuela) {
        return this.http.get('/api/ciclos?idEscuela=' + idEscuela)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Agregar Ciclo 
    AbcService.prototype.insertCiclo = function (ciclo) {
        return this.http.post('/api/cicloInsert', ciclo, httpOptions).pipe(tap(function (_) { return console.log('insert ciclo'); }), catchError(this.handleError('insertCiclo')));
    };
    //Obtener Ciclo
    AbcService.prototype.getCiclo = function (idCiclo) {
        return this.http.get('/api/ciclo?idCiclo=' + idCiclo)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Actualizar Ciclo
    AbcService.prototype.updateCiclo = function (ciclo) {
        return this.http.put('/api/cicloUpdate', ciclo, httpOptions).pipe(tap(function (_) { return console.log('updated ciclo'); }), catchError(this.handleError('updateCiclo')));
    };
    //ABC Aulas
    //Obtener AulasxEdificio
    AbcService.prototype.getAulasxEdificio = function (idEdificio) {
        return this.http.get('/api/aulasxEdificio?idEdificio=' + idEdificio)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Obtener Aulas
    AbcService.prototype.getAulas = function (idEscuela) {
        return this.http.get('/api/aulas?idEscuela=' + idEscuela)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Agregar Aula 
    AbcService.prototype.insertAula = function (aula) {
        return this.http.post('/api/aulaInsert', aula, httpOptions).pipe(tap(function (_) { return console.log('insert aula'); }), catchError(this.handleError('insertAula')));
    };
    //Actualizar Aula
    AbcService.prototype.updateAula = function (aula) {
        return this.http.put('/api/aulaUpdate', aula, httpOptions).pipe(tap(function (_) { return console.log('updated aula'); }), catchError(this.handleError('updateAula')));
    };
    //Obtener Aula
    AbcService.prototype.getAula = function (idAula) {
        return this.http.get('/api/aula?idAula=' + idAula)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //ABC Edificios
    //Obtener Edificios
    AbcService.prototype.getEdificios = function (idEScuela) {
        return this.http.get('/api/edificios?idEscuela=' + idEScuela)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Actualizar Edificio
    AbcService.prototype.updateEdificio = function (edificio) {
        return this.http.put('/api/edificioUpdate', edificio, httpOptions).pipe(tap(function (_) { return console.log('updated edificio'); }), catchError(this.handleError('updateEdificio')));
    };
    //Agregar Edificio 
    AbcService.prototype.insertEdificio = function (edificio) {
        return this.http.post('/api/edificioInsert', edificio, httpOptions).pipe(tap(function (_) { return console.log('insert edificio'); }), catchError(this.handleError('insertEdificio')));
    };
    //Obtener Edificio
    AbcService.prototype.getEdificio = function (idEdificio) {
        return this.http.get('/api/edificio?idEdificio=' + idEdificio)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //ABC Docente
    //Obtener Docente_Usuario
    AbcService.prototype.getDocente_Usuario = function (idUsuario) {
        return this.http.get('/api/docenteUsuario?idUsuario=' + idUsuario)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Obtener Docenetes
    AbcService.prototype.getDocenetes = function (idEScuela) {
        return this.http.get('/api/docentes?idEscuela=' + idEScuela)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Actualizar Docenete
    AbcService.prototype.updateDocenete = function (docente) {
        return this.http.put('/api/docenteUpdate', docente, httpOptions).pipe(tap(function (_) { return console.log('updated administrador'); }), catchError(this.handleError('updateAdministrador')));
    };
    //Agregar Docenete
    AbcService.prototype.insertDocenete = function (docente) {
        return this.http.post('/api/docenteInsert', docente, httpOptions).pipe(tap(function (_) { return console.log('insert administrador'); }), catchError(this.handleError('insertAdministrador')));
    };
    //Obtener Docente
    AbcService.prototype.getDocenete = function (idDocente) {
        return this.http.get('/api/docente?idDocente=' + idDocente)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //ABC Administrador
    //Obtener Administradores
    AbcService.prototype.getAdministradoresUsuario = function (idUsuario, idEScuela) {
        return this.http.get('/api/administradoresUsuario?idUsuario=' + idUsuario + '&idEscuela=' + idEScuela)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //subir imagen 
    AbcService.prototype.subirImagenAdmin = function (datos) {
        return this.http.post('/api/subirImagenAdmin', datos);
    };
    //Obtener Administrador
    AbcService.prototype.getAdministrador = function (idAdministrador) {
        return this.http.get('/api/administrador?idAdministrador=' + idAdministrador)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Obtener Administrador_Usuario
    AbcService.prototype.getAdministrador_Usuario = function (idUsuario) {
        return this.http.get('/api/administradorUsuario?idUsuario=' + idUsuario)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Obtener Administradores
    AbcService.prototype.getAdministradores = function () {
        return this.http.get('/api/administradores')
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Actualizar Administrador
    AbcService.prototype.updateAdministrador = function (administrador) {
        return this.http.put('/api/administradorUpdate', administrador, httpOptions).pipe(tap(function (_) { return console.log('updated administrador'); }), catchError(this.handleError('updateAdministrador')));
    };
    //Agregar Administrador
    AbcService.prototype.insertAdministrador = function (administrador) {
        return this.http.post('/api/administradorInsert', administrador, httpOptions).pipe(tap(function (_) { return console.log('insert administrador'); }), catchError(this.handleError('insertAdministrador')));
    };
    //ABC Escuela
    //Obtener Escuela
    AbcService.prototype.getEscuela = function (clave) {
        return this.http.get('/api/escuela?clave=' + clave)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Obtener Escuela por id
    AbcService.prototype.getEscuela_Id = function (id) {
        return this.http.get('/api/escuela_ID?idEscuela=' + id)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Obtener Escuelas
    AbcService.prototype.getEscuelas = function () {
        return this.http.get('/api/escuelas')
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Actualizar Escuela
    AbcService.prototype.updateEscuela = function (escuela) {
        return this.http.put('/api/escuelaUpdate', escuela, httpOptions).pipe(tap(function (_) { return console.log('updated escuela'); }), catchError(this.handleError('updateEscuela')));
    };
    //Agregar Escuela
    AbcService.prototype.insertEscuela = function (escuela) {
        return this.http.post('/api/escuelaInsert', escuela, httpOptions).pipe(tap(function (_) { return console.log('insert escuela'); }), catchError(this.handleError('insertEscuela')));
    };
    //ABC Seccion
    //Obtener Seccion
    AbcService.prototype.getSeccion = function (idSeccion) {
        return this.http.get('/api/seccion?idSeccion=' + idSeccion)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Obtener Secciones
    AbcService.prototype.getSecciones = function () {
        return this.http.get('/api/secciones')
            .pipe(map(function (result) {
            return result;
        }));
    };
    //ABC Estados
    //Obtener Estado
    AbcService.prototype.getEstado = function (idEStaado) {
        return this.http.get('/api/estado?idEstado=' + idEStaado)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Obtener EStados
    AbcService.prototype.getEstados = function () {
        return this.http.get('/api/estados')
            .pipe(map(function (result) {
            return result;
        }));
    };
    //ABC Municipios
    //Obtener Municipio
    AbcService.prototype.getMunicipio = function (idMunicipio) {
        return this.http.get('/api/municipio?idMunicipio=' + idMunicipio)
            .pipe(map(function (result) {
            return result;
        }));
    };
    //Obtener Municipio_Estado
    AbcService.prototype.getMunicipioEdo = function (idEstado) {
        return this.http.get('/api/municipios_estado?idEstado=' + idEstado)
            .pipe(map(function (result) {
            console.log(result);
            return result;
        }));
    };
    AbcService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // Let the app keep running by returning an empty result.
            return of(result);
        };
    };
    AbcService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], AbcService);
    return AbcService;
}());
export { AbcService };
//# sourceMappingURL=abc.service.js.map