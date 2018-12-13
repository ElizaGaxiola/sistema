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
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
var IndexAdminComponent = /** @class */ (function () {
    function IndexAdminComponent(router, auth, pf) {
        this.router = router;
        this.auth = auth;
        this.pf = pf;
        this.usuarioData = { idUsuario: '', idTipo: '', usuario: '', password: '' };
    }
    IndexAdminComponent.prototype.autenticarDocente = function () {
        var _this = this;
        this.auth.login(this.loginAdm.email, this.loginAdm.contrasena)
            .pipe(first())
            .subscribe(function (result) { return _this.router.navigate(['docente/dashboard']); }, function (err) { return _this.error = 'Datos erroneos'; });
    };
    IndexAdminComponent.prototype.autenticarAdministrador = function () {
        var _this = this;
        this.auth.login(this.loginAdm.email, this.loginAdm.contrasena)
            .pipe(first())
            .subscribe(function (result) { return _this.router.navigate(['administrativos/dashboard']); }, function (err) { return _this.error = 'Datos erroneos'; });
    };
    IndexAdminComponent.prototype.autenticarSuperUsuario = function () {
        var _this = this;
        this.auth.login(this.loginAdm.email, this.loginAdm.contrasena)
            .pipe(first())
            .subscribe(function (result) { return _this.router.navigate(['superusuario/dashboard']); }, function (err) { return _this.error = 'Datos erroneos'; });
    };
    IndexAdminComponent.prototype.submit = function () {
        var _this = this;
        this.auth.getUser(this.loginAdm.email)
            .subscribe(function (data) {
            _this.usuarioData.idUsuario = data.idUsuario;
            _this.usuarioData.idTipo = data.idTipo;
            _this.usuarioData.usuario = data.usuario;
            _this.usuarioData.password = data.password;
            if (_this.usuarioData.idTipo == 1) {
                _this.autenticarDocente();
            }
            else if (_this.usuarioData.idTipo == 3) {
                _this.autenticarAdministrador();
            }
            else if (_this.usuarioData.idTipo == 4) {
                _this.autenticarSuperUsuario();
            }
            else {
                _this.error = 'Datos erroneos';
            }
        });
    };
    IndexAdminComponent.prototype.ngOnInit = function () {
        this.loginadmForm = this.pf.group({
            email: ['', [Validators.required, Validators.email]],
            contrasena: ['', [Validators.required]]
        });
    };
    IndexAdminComponent.prototype.onSubmit = function () {
        this.loginAdm = this.saveLogin();
        this.submit();
    };
    IndexAdminComponent.prototype.saveLogin = function () {
        var saveLogin = {
            email: this.loginadmForm.get('email').value,
            contrasena: this.loginadmForm.get('contrasena').value
        };
        return saveLogin;
    };
    IndexAdminComponent = __decorate([
        Component({
            selector: 'app-index-admin',
            templateUrl: './index-admin.component.html',
            styleUrls: ['./index-admin.component.css']
        }),
        __metadata("design:paramtypes", [Router, AuthService, FormBuilder])
    ], IndexAdminComponent);
    return IndexAdminComponent;
}());
export { IndexAdminComponent };
//# sourceMappingURL=index-admin.component.js.map