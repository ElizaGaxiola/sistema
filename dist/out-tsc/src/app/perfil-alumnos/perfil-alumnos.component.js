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
import { AbcService } from '../abc.service';
import { AuthService } from '../auth.service';
var PerfilAlumnosComponent = /** @class */ (function () {
    function PerfilAlumnosComponent(abc, auth) {
        this.abc = abc;
        this.auth = auth;
        this.modulo = 'Perfil';
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
        this.municipio = '';
        this.estado = '';
    }
    PerfilAlumnosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.idUsuario = localStorage.getItem('idUsuario');
        this.abc.getAlumnoUsuario(this.idUsuario).subscribe(function (data) {
            _this.alumno = data;
            _this.abc.getMunicipio(_this.alumno.idMunicipio).subscribe(function (mun) {
                _this.municipio = mun.nombre;
                _this.abc.getEstado(mun.idEstado).subscribe(function (est) {
                    _this.estado = est.nombre;
                });
            });
            console.log(_this.alumno);
        });
    };
    PerfilAlumnosComponent = __decorate([
        Component({
            selector: 'app-perfil-alumnos',
            templateUrl: './perfil-alumnos.component.html',
            styleUrls: ['./perfil-alumnos.component.css']
        }),
        __metadata("design:paramtypes", [AbcService, AuthService])
    ], PerfilAlumnosComponent);
    return PerfilAlumnosComponent;
}());
export { PerfilAlumnosComponent };
//# sourceMappingURL=perfil-alumnos.component.js.map