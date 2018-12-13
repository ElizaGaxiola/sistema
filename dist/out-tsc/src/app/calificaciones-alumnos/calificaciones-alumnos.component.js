var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbcService } from '../abc.service';
var CalificacionesAlumnosComponent = /** @class */ (function () {
    function CalificacionesAlumnosComponent(pf, abc) {
        this.pf = pf;
        this.abc = abc;
        this.modulo = "Calificaciones";
        this.dtOptions = {};
        //datos para datatable
        this.data = [];
        this.alumno = {
            idAlumno: '',
            matricula: '',
            nombre: '',
            apellidoP: '',
            apellidoM: '',
            fechaNac: '',
            email: '',
            telefono: '',
            celular: '',
            curp: '',
            sexo: '',
            idMunicipio: '',
            colonia: '',
            calle: '',
            numero: '',
            cp: '',
            urlImagen: '',
            idUsuario: '',
            idEscuela: '',
            cardexDoc: '',
            actaNacDoc: '',
            comprobanteDoc: '',
            credencialDoc: ''
        };
        this.cicloSelect = [];
        this.subcicloSelect = [];
    }
    CalificacionesAlumnosComponent.prototype.changeCiclo = function () {
        var _this = this;
        console.log(this.idCiclo);
        this.subcicloSelect = [];
        this.abc.getSubCiclos_Ciclos(this.idCiclo).subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var subCiclo = data_1[_i];
                _this.subcicloSelect = _this.subcicloSelect.concat([{ id: subCiclo.idSubCiclo, name: subCiclo.descripcion }]);
            }
        });
    };
    CalificacionesAlumnosComponent.prototype.changeSub = function () {
        console.log(this.alumno.idAlumno);
        console.log(this.idCiclo);
        console.log(this.idSubciclo);
        this.abc.getCalificacionesAlumno(this.alumno.idAlumno, this.idCiclo, this.idSubciclo).subscribe(function (data) {
            console.log(data);
        });
    };
    CalificacionesAlumnosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.idUsuario = localStorage.getItem('idUsuario');
        this.abc.getAlumnoUsuario(this.idUsuario).subscribe(function (data) {
            _this.alumno = data;
            console.log(_this.alumno);
            _this.abc.getCiclos(data.idEscuela).subscribe(function (ciclos) {
                for (var _i = 0, ciclos_1 = ciclos; _i < ciclos_1.length; _i++) {
                    var ciclo = ciclos_1[_i];
                    _this.cicloSelect = _this.cicloSelect.concat([{ id: ciclo.idCiclo, name: ciclo.descripcion }]);
                }
            });
        });
        this.dtOptions = {
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
                "search": "Buscar:",
                "zeroRecords": "Sin resultados encontrados",
                "paginate": {
                    "first": "Primero",
                    "last": "Ultimo",
                    "next": "Siguiente",
                    "previous": "Anterior"
                }
            }
        };
    };
    CalificacionesAlumnosComponent = __decorate([
        Component({
            selector: 'app-calificaciones-alumnos',
            templateUrl: './calificaciones-alumnos.component.html',
            styleUrls: ['./calificaciones-alumnos.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, AbcService])
    ], CalificacionesAlumnosComponent);
    return CalificacionesAlumnosComponent;
}());
export { CalificacionesAlumnosComponent };
//# sourceMappingURL=calificaciones-alumnos.component.js.map