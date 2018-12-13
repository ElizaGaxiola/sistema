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
import { map } from 'rxjs/operators';
var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
    }
    AuthService.prototype.login = function (usuario, contrasena) {
        var _this = this;
        return this.http.post('/api/auth', { usuario: usuario, contrasena: contrasena })
            .pipe(map(function (result) {
            localStorage.setItem('access_token', result.token);
            _this.taki = JSON.parse(atob(result.token.split('.')[1]));
            console.log(_this.taki);
            localStorage.setItem('idUsuario', _this.taki.idUsuario);
            localStorage.setItem('tipo', _this.taki.idTipo);
            return true;
        }));
    };
    AuthService.prototype.getUser = function (usuario) {
        return this.http.get('/api/usuario?usuario=' + usuario)
            .pipe(map(function (result) {
            return result;
        }));
    };
    AuthService.prototype.getUserId = function (idUsuario) {
        return this.http.get('/api/usuarioid?idUsuario=' + idUsuario)
            .pipe(map(function (result) {
            return result;
        }));
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('access_token');
        localStorage.removeItem('idUsuario');
    };
    Object.defineProperty(AuthService.prototype, "loggedIn", {
        get: function () {
            return (localStorage.getItem('access_token') !== null);
        },
        enumerable: true,
        configurable: true
    });
    AuthService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map