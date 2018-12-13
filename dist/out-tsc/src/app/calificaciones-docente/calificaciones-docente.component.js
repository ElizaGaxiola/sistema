var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectorRef } from '@angular/core';
import { AbcService } from '../abc.service';
var CalificacionesDocenteComponent = /** @class */ (function () {
    function CalificacionesDocenteComponent(abc, chRef) {
        this.abc = abc;
        this.chRef = chRef;
        this.modulo = "Calificaciones";
        this.grupos = [];
        this.materia = '';
        this.cali = false;
        //datos para datatable
        this.data = [];
        this.calif = 0;
        this.promedio = 0;
        this.promedioAcu = 0;
        this.totAlumnos = 0;
    }
    CalificacionesDocenteComponent.prototype.change = function () {
        var _this = this;
        this.data = [];
        this.promedioAcu = 0;
        this.totAlumnos = 0;
        if (this.idGrupo) {
            this.abc.getGrupo(this.idGrupo).subscribe(function (data) {
                _this.abc.getAsignatura(data.idMateria).subscribe(function (asignatura) {
                    _this.materia = asignatura.nombre;
                    console.log(_this.materia);
                    _this.abc.getActa(data.idSeccion, data.idPeriodo, data.idCarrera).subscribe(function (acta) {
                        if (acta.status == false) {
                            _this.cali = false;
                        }
                        else {
                            _this.acta = acta;
                            _this.abc.getAlumnosxGrupo(_this.idGrupo)
                                .subscribe(function (data) {
                                var _loop_1 = function (alumno) {
                                    _this.totAlumnos = _this.totAlumnos + 1;
                                    _this.abc.getCalificacion(_this.acta.idConfCalificacion, _this.idGrupo, alumno.idAlumno).subscribe(function (calif) {
                                        console.log(calif);
                                        _this.calif = Number(calif.calificacion);
                                        _this.promedioAcu = _this.promedioAcu + _this.calif;
                                        _this.prom();
                                        _this.data = _this.data.concat([{ matricula: alumno.matricula, apellidop: alumno.apellidoP, apellidom: alumno.apellidoM, nombre: alumno.nombre, calificacion: _this.calif }]);
                                    });
                                };
                                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                                    var alumno = data_1[_i];
                                    _loop_1(alumno);
                                }
                                _this.chRef.detectChanges();
                                // Now you can use jQuery DataTables :
                                var table = $('table');
                                table.DataTable();
                            });
                        }
                    });
                });
            });
        }
        else {
            this.materia = '';
        }
    };
    CalificacionesDocenteComponent.prototype.prom = function () {
        console.log('promedio');
        console.log(this.totAlumnos);
        console.log(this.promedioAcu);
        this.promedio = this.promedioAcu / this.totAlumnos;
    };
    CalificacionesDocenteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.idUsuario = localStorage.getItem('idUsuario');
        this.abc.getDocente_Usuario(this.idUsuario).subscribe(function (user) {
            _this.abc.getDocenete(user.idDocente).subscribe(function (data) {
                console.log(data);
                _this.abc.getGruposDocente(data.idDocente).subscribe(function (grupos) {
                    for (var _i = 0, grupos_1 = grupos; _i < grupos_1.length; _i++) {
                        var grupo = grupos_1[_i];
                        _this.grupos = _this.grupos.concat([{ id: grupo.idGrupo, name: grupo.clave }]);
                    }
                });
            });
        });
        this.dtOptions = {
            "ordering": false,
            dom: 'Bfrtip',
            buttons: [
                'copy',
                {
                    extend: 'excel',
                    title: 'ACTA'
                },
                {
                    extend: 'pdf',
                    title: 'ACTA'
                },
                {
                    extend: 'print',
                    title: 'ACTA'
                }
            ],
            language: {
                "emptyTable": "Sin resultados encontrados",
                "info": " _START_ - _END_ / _TOTAL_ ",
                "infoEmpty": "0-0 /0",
                "infoFiltered": "",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Mostrar _MENU_ registros",
                "loadingRecords": "Cargando...",
                "processing": "Procesando...",
                "search": "<i class='fas fa-search'></i>",
                "zeroRecords": "Sin resultados encontrados",
                "paginate": {
                    "first": "Primero",
                    "last": "Ultimo",
                    "next": "Siguiente",
                    "previous": "Anterior"
                },
            }
        };
    };
    CalificacionesDocenteComponent = __decorate([
        Component({
            selector: 'app-calificaciones-docente',
            templateUrl: './calificaciones-docente.component.html',
            styleUrls: ['./calificaciones-docente.component.css']
        }),
        __metadata("design:paramtypes", [AbcService, ChangeDetectorRef])
    ], CalificacionesDocenteComponent);
    return CalificacionesDocenteComponent;
}());
export { CalificacionesDocenteComponent };
//# sourceMappingURL=calificaciones-docente.component.js.map