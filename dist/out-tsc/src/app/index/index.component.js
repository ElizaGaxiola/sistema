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
var IndexComponent = /** @class */ (function () {
    function IndexComponent(router, auth, pf) {
        this.router = router;
        this.auth = auth;
        this.pf = pf;
        this.usuarioData = { idUsuario: '', idTipo: '', usuario: '', password: '' };
    }
    IndexComponent.prototype.autenticar = function () {
        var _this = this;
        console.log(this.loginalum.usuario);
        console.log(this.loginalum.contrasena);
        this.auth.login(this.loginalum.usuario, this.loginalum.contrasena)
            .pipe(first())
            .subscribe(function (result) { return _this.router.navigate(['alumnos/avisos']); }, function (err) { return _this.error = 'Datos erroneos'; });
    };
    IndexComponent.prototype.submit = function () {
        var _this = this;
        this.auth.getUser(this.loginalum.usuario)
            .subscribe(function (data) {
            _this.usuarioData.idUsuario = data.idUsuario;
            _this.usuarioData.idTipo = data.idTipo;
            _this.usuarioData.usuario = data.usuario;
            _this.usuarioData.password = data.password;
            if (_this.usuarioData.idTipo == 2) {
                _this.autenticar();
            }
            else {
                _this.error = 'Datos erroneos';
            }
        });
    };
    IndexComponent.prototype.ngOnInit = function () {
        this.loginalumForm = this.pf.group({
            usuario: ['', [Validators.required]],
            contrasena: ['', [Validators.required]]
        });
    };
    IndexComponent.prototype.onSubmit = function () {
        this.loginalum = this.saveLogin();
        this.submit();
    };
    IndexComponent.prototype.saveLogin = function () {
        var saveLogin = {
            usuario: this.loginalumForm.get('usuario').value,
            contrasena: this.loginalumForm.get('contrasena').value
        };
        return saveLogin;
    };
    IndexComponent = __decorate([
        Component({
            selector: 'app-index',
            templateUrl: './index.component.html',
            styleUrls: ['./index.component.css']
        }),
        __metadata("design:paramtypes", [Router, AuthService, FormBuilder])
    ], IndexComponent);
    return IndexComponent;
}());
export { IndexComponent };
//# sourceMappingURL=index.component.js.map