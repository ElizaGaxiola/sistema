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
var MenuComponent = /** @class */ (function () {
    function MenuComponent(auth, abc) {
        this.auth = auth;
        this.abc = abc;
        this.docente = {
            idDocente: 0,
            nombre: '',
            apellidoP: '',
            apellidoM: '',
            fechaNac: '',
            nss: '',
            telefono: '',
            titulo: '',
            curp: '',
            sexo: '',
            idMunicipio: 0,
            colonia: '',
            calle: '',
            numero: '',
            cp: '',
            urlImagen: '',
            usuarioId: 0,
            estatus: 0,
            escuelaId: 0,
            idUsuario: 0,
            idTipo: 0,
            usuario: '',
            contrasena: ''
        };
        this.grupos = [];
    }
    MenuComponent.prototype.salir = function () {
        this.auth.logout();
    };
    MenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.idUsuario = localStorage.getItem('idUsuario');
        this.abc.getDocente_Usuario(this.idUsuario).subscribe(function (data) {
            _this.docente = data;
            _this.abc.getGruposDocente(_this.docente.idDocente).subscribe(function (grupos) {
                _this.grupos = grupos;
                console.log(grupos);
            });
            _this.auth.getUserId(data.usuarioId)
                .subscribe(function (user) {
                _this.email = user.usuario;
            });
        });
    };
    MenuComponent = __decorate([
        Component({
            selector: 'app-menu',
            templateUrl: './menu.component.html',
            styleUrls: ['./menu.component.css']
        }),
        __metadata("design:paramtypes", [AuthService, AbcService])
    ], MenuComponent);
    return MenuComponent;
}());
export { MenuComponent };
//# sourceMappingURL=menu.component.js.map