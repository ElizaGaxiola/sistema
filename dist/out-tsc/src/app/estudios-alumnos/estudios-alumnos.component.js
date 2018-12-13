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
var EstudiosAlumnosComponent = /** @class */ (function () {
    function EstudiosAlumnosComponent(pf, abc) {
        this.pf = pf;
        this.abc = abc;
        this.modulo = "Estudios";
        this.administradorUser = {
            idAdministrador: 0,
            nombre: '',
            apellidoP: '',
            apellidoM: '',
            email: '',
            contrasena: '',
            idUsuario: 0,
            idEscuela: 0,
            estatus: 0,
            imagen: ''
        };
    }
    EstudiosAlumnosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.inicializarForm();
        this.idUsuario = localStorage.getItem('idUsuario');
        this.abc.getAlumnoUsuario(this.idUsuario).subscribe(function (data) {
            console.log(data);
            _this.abc.getEscuela_Id(data.idEscuela).subscribe(function (escuela) {
                console.log(escuela);
                _this.abc.getSeccion(escuela.idSeccion).subscribe(function (sec) {
                    console.log(sec);
                    _this.seccion = sec;
                    _this.abc.getMunicipio(escuela.idMunicipio).subscribe(function (mun) {
                        console.log(mun);
                        _this.municipio = mun;
                        _this.abc.getEstado(mun.idEstado).subscribe(function (est) {
                            console.log(est);
                            _this.estado = est;
                            _this.escuela = escuela;
                            _this.estudiosForm = _this.pf.group({
                                idEscuela: escuela.idEscuela,
                                idSeccion: _this.seccion.descripcion,
                                clave: escuela.clave,
                                nombre: escuela.nombre,
                                idMunicipio: _this.municipio.nombre,
                                idEstado: est.nombre,
                                colonia: escuela.colonia,
                                calle: escuela.calle,
                                cp: escuela.cp,
                                numero: escuela.numero,
                                email: escuela.email,
                                telefono: escuela.telefono,
                                estatus: escuela.estatus
                            });
                            console.log(_this.estudiosForm);
                        });
                    });
                });
            });
        });
    };
    EstudiosAlumnosComponent.prototype.inicializarForm = function () {
        this.estudiosForm = this.pf.group({
            idEscuela: [''],
            idSeccion: [''],
            clave: [''],
            nombre: [''],
            idEstado: [''],
            idMunicipio: [''],
            colonia: [''],
            calle: [''],
            cp: [''],
            numero: [''],
            email: [''],
            telefono: [''],
            estatus: [''],
        });
    };
    EstudiosAlumnosComponent = __decorate([
        Component({
            selector: 'app-estudios-alumnos',
            templateUrl: './estudios-alumnos.component.html',
            styleUrls: ['./estudios-alumnos.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, AbcService])
    ], EstudiosAlumnosComponent);
    return EstudiosAlumnosComponent;
}());
export { EstudiosAlumnosComponent };
//# sourceMappingURL=estudios-alumnos.component.js.map