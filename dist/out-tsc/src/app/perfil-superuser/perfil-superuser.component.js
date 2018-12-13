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
var PerfilSuperuserComponent = /** @class */ (function () {
    function PerfilSuperuserComponent(abc) {
        this.abc = abc;
        this.modulo = 'Perfil';
        this.administrador = {
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
    PerfilSuperuserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.idUsuario = localStorage.getItem('idUsuario');
        this.abc.getAdministrador_Usuario(this.idUsuario).subscribe(function (data) {
            _this.administrador = data;
        });
    };
    PerfilSuperuserComponent = __decorate([
        Component({
            selector: 'app-perfil-superuser',
            templateUrl: './perfil-superuser.component.html',
            styleUrls: ['./perfil-superuser.component.css']
        }),
        __metadata("design:paramtypes", [AbcService])
    ], PerfilSuperuserComponent);
    return PerfilSuperuserComponent;
}());
export { PerfilSuperuserComponent };
//# sourceMappingURL=perfil-superuser.component.js.map