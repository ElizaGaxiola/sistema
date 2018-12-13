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
import { AuthService } from '../auth.service';
import { AbcService } from '../abc.service';
var MenuAlumComponent = /** @class */ (function () {
    function MenuAlumComponent(auth, abc) {
        this.auth = auth;
        this.abc = abc;
        this.alumno = {
            idAlumno: [''],
            matricula: [''],
            nombre: [''],
            apellidoP: [''],
            apellidoM: [''],
            fechaNac: [''],
            email: [''],
            telefono: [''],
            celular: [''],
            curp: [''],
            sexo: [''],
            idMunicipio: [''],
            colonia: [''],
            calle: [''],
            numero: [''],
            cp: [''],
            urlImagen: [''],
            idUsuario: [''],
            idEscuela: [''],
            cardexDoc: [''],
            actaNacDoc: [''],
            comprobanteDoc: [''],
            credencialDoc: ''
        };
    }
    MenuAlumComponent.prototype.salir = function () {
        this.auth.logout();
    };
    MenuAlumComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.idUsuario = localStorage.getItem('idUsuario');
        this.abc.getAlumnoUsuario(this.idUsuario).subscribe(function (data) {
            _this.alumno = data;
            console.log(_this.alumno);
        });
    };
    MenuAlumComponent = __decorate([
        Component({
            selector: 'app-menu-alum',
            templateUrl: './menu-alum.component.html',
            styleUrls: ['./menu-alum.component.css']
        }),
        __metadata("design:paramtypes", [AuthService, AbcService])
    ], MenuAlumComponent);
    return MenuAlumComponent;
}());
export { MenuAlumComponent };
//# sourceMappingURL=menu-alum.component.js.map