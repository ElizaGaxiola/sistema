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
import { FormBuilder, Validators } from '@angular/forms';
import { AbcService } from '../abc.service';
import { Router } from '@angular/router';
var AlumnoreinscripcionComponent = /** @class */ (function () {
    function AlumnoreinscripcionComponent(router, pf, abc) {
        this.router = router;
        this.pf = pf;
        this.abc = abc;
        this.cicloSelect = [];
        this.subcicloSelect = [];
        this.periodoSelect = [];
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
    }
    AlumnoreinscripcionComponent.prototype.changeCiclo = function () {
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
    AlumnoreinscripcionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.idUsuario = localStorage.getItem('idUsuario');
        this.abc.getAlumnoUsuario(this.idUsuario).subscribe(function (data) {
            _this.alumno = data;
            console.log(_this.alumno);
            _this.abc.getEscuela_Id(data.idEscuela).subscribe(function (escuela) {
                _this.escuela = escuela.nombre;
            });
            _this.abc.getCiclos(data.idEscuela).subscribe(function (ciclos) {
                for (var _i = 0, ciclos_1 = ciclos; _i < ciclos_1.length; _i++) {
                    var ciclo = ciclos_1[_i];
                    _this.cicloSelect = _this.cicloSelect.concat([{ id: ciclo.idCiclo, name: ciclo.descripcion }]);
                }
            });
            _this.abc.getPeriodos(data.idEscuela).subscribe(function (data) {
                for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                    var item = data_2[_i];
                    _this.id = { idSeccion: item.idSeccion, idPeriodo: item.idPeriodo, idCarrera: item.idCarrera };
                    _this.periodoSelect = _this.periodoSelect.concat([{ id: _this.id, name: item.descripcion }]);
                }
            });
        });
        this.reinscripcionForm = this.pf.group({
            idSubCiclo: ['', [Validators.required]],
            idCiclo: ['', [Validators.required]],
            idPeriodo: ['', [Validators.required]],
            idSeccion: [''],
            idCarrera: [''],
            idEscuela: [''],
        });
    };
    AlumnoreinscripcionComponent.prototype.onSubmit = function () {
        this.reinscripcion = this.saveReinscripcion();
        console.log(this.reinscripcion);
        this.router.navigate(['alumnos/reinscripcion/recibo', this.alumno.idAlumno, this.reinscripcion.idCiclo, this.id.idCarrera]);
    };
    AlumnoreinscripcionComponent.prototype.saveReinscripcion = function () {
        var saveReinscripcion = {
            idEscuela: this.alumno.idEscuela,
            idCiclo: this.reinscripcionForm.get('idCiclo').value,
            idSubCiclo: this.reinscripcionForm.get('idSubCiclo').value,
            idPeriodo: this.id.idPeriodo,
            idSeccion: this.id.idSeccion,
            idCarrera: this.id.idCarrera,
        };
        return saveReinscripcion;
    };
    AlumnoreinscripcionComponent = __decorate([
        Component({
            selector: 'app-alumnoreinscripcion',
            templateUrl: './alumnoreinscripcion.component.html',
            styleUrls: ['./alumnoreinscripcion.component.css']
        }),
        __metadata("design:paramtypes", [Router, FormBuilder, AbcService])
    ], AlumnoreinscripcionComponent);
    return AlumnoreinscripcionComponent;
}());
export { AlumnoreinscripcionComponent };
//# sourceMappingURL=alumnoreinscripcion.component.js.map