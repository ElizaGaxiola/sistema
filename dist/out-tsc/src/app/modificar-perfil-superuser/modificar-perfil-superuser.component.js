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
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
var ModificarPerfilSuperuserComponent = /** @class */ (function () {
    function ModificarPerfilSuperuserComponent(pf, abc) {
        this.pf = pf;
        this.abc = abc;
        this.modulo = 'Modificar Perfil';
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
        this.loader = false;
        this._success = new Subject();
        this._danger = new Subject();
        this.staticAlertClosed = false;
        this.iniciar();
    }
    ModificarPerfilSuperuserComponent.prototype.iniciar = function () {
        var _this = this;
        this.idUsuario = localStorage.getItem('idUsuario');
        this.abc.getAdministrador_Usuario(this.idUsuario).subscribe(function (data) {
            _this.administrador = data;
            _this.modsuperForm = _this.pf.group({
                idAdministrador: [data.idAdministrador],
                nombre: [data.nombre, [Validators.required]],
                apellidoP: [data.apellidoP, [Validators.required]],
                apellidoM: [data.apellidoM, [Validators.required]],
                email: [data.email, [Validators.required, Validators.email]],
                contrasena: [data.contrasena, [Validators.required]],
                idUsuario: [data.idUsuario],
                idEscuela: [data.idEscuela],
                estatus: [data.estatus],
                imagen: [data.imagen]
            });
        });
    };
    ModificarPerfilSuperuserComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { return _this.staticAlertClosed = true; }, 20000);
        this._success.subscribe(function (message) { return _this.successMessage = message; });
        this._success.pipe(debounceTime(5000)).subscribe(function () { return _this.successMessage = null; });
        this._danger.subscribe(function (message) { return _this.dangerMessage = message; });
        this._danger.pipe(debounceTime(5000)).subscribe(function () { return _this.dangerMessage = null; });
        this.modsuperForm = this.pf.group({
            idAdministrador: [''],
            nombre: ['', [Validators.required]],
            apellidoP: ['', [Validators.required]],
            apellidoM: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            contrasena: ['', [Validators.required]],
            idUsuario: [],
            idEscuela: [],
            estatus: [],
            imagen: []
        });
    };
    ModificarPerfilSuperuserComponent.prototype.onSubmit = function () {
        var _this = this;
        this.modsuper = this.saveModsuper();
        this.abc.updateAdministrador(this.modsuper).subscribe(function (res) {
            _this.iniciar();
            _this._success.next('Datos actualizados con éxito');
        }, function (err) {
            _this._danger.next('A ocurrido un error intentalo de nuevo');
        });
    };
    ModificarPerfilSuperuserComponent.prototype.saveModsuper = function () {
        var saveModsuper = {
            idAdministrador: this.modsuperForm.get('idAdministrador').value,
            nombre: this.modsuperForm.get('nombre').value,
            apellidoP: this.modsuperForm.get('apellidoP').value,
            apellidoM: this.modsuperForm.get('apellidoM').value,
            email: this.modsuperForm.get('email').value,
            contrasena: this.modsuperForm.get('contrasena').value,
            idUsuario: this.modsuperForm.get('idUsuario').value,
            idEscuela: this.modsuperForm.get('idEscuela').value,
            estatus: this.modsuperForm.get('estatus').value,
            imagen: this.administrador.imagen
        };
        return saveModsuper;
    };
    ModificarPerfilSuperuserComponent.prototype.cargandoImagen = function (e) {
        var _this = this;
        var img = e.target;
        if (img.files.length > 0) {
            this.loader = true;
            var form = new FormData();
            form.append('file', img.files[0]);
            this.abc.subirImagenAdmin(form).subscribe(function (resp) {
                _this.loader = false;
                if (resp.status) {
                    _this.administrador.imagen = resp.generatedName;
                }
                else {
                    _this._danger.next('Revise la extención de su imagen');
                }
            }, function (error) {
                _this.loader = false;
                alert('Imagen supera el tamaño permitido');
            });
        }
    };
    ModificarPerfilSuperuserComponent = __decorate([
        Component({
            selector: 'app-modificar-perfil-superuser',
            templateUrl: './modificar-perfil-superuser.component.html',
            styleUrls: ['./modificar-perfil-superuser.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, AbcService])
    ], ModificarPerfilSuperuserComponent);
    return ModificarPerfilSuperuserComponent;
}());
export { ModificarPerfilSuperuserComponent };
//# sourceMappingURL=modificar-perfil-superuser.component.js.map