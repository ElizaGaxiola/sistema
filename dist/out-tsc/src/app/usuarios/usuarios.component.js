var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AbcService } from '../abc.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
var UsuariosComponent = /** @class */ (function () {
    function UsuariosComponent(abc, pf, chRef) {
        var _this = this;
        this.abc = abc;
        this.pf = pf;
        this.chRef = chRef;
        this.modulo = 'Usuarios';
        this.data = [];
        this.escuelasSelect = [];
        this._success = new Subject();
        this._danger = new Subject();
        this.staticAlertClosed = false;
        this.obtenerAdministradores();
        this.abc.getEscuelas().subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var escuela = data_1[_i];
                _this.escuelasSelect = _this.escuelasSelect.concat([{ id: escuela.idEscuela, name: escuela.nombre }]);
            }
        });
    }
    UsuariosComponent.prototype.onSubmit = function () {
        var _this = this;
        this.administrador = this.saveAdministrador();
        console.log(this.administrador);
        if (this.modal == 'modificar') {
            this.abc.updateAdministrador(this.administrador).subscribe(function (res) {
                _this.obtenerAdministradores();
                _this._success.next('Datos modificados con éxito');
                $("#modal-modificar").modal('hide');
            }, function (err) {
                _this._danger.next('A ocurrido un error intentalo de nuevo');
                console.log(err);
            });
        }
        else {
            this.abc.insertAdministrador(this.administrador).subscribe(function (res) {
                _this.obtenerAdministradores();
                $("#modal-modificar").modal('hide');
            }, function (err) {
                console.log(err);
            });
        }
    };
    UsuariosComponent.prototype.saveAdministrador = function () {
        var saveAdministrador = {
            idAdministrador: this.administradorForm.get('idAdministrador').value,
            nombre: this.administradorForm.get('nombre').value,
            apellidoP: this.administradorForm.get('apellidoP').value,
            apellidoM: this.administradorForm.get('apellidoM').value,
            email: this.administradorForm.get('email').value,
            contrasena: this.administradorForm.get('contrasena').value,
            idUsuario: this.administradorForm.get('idUsuario').value,
            idEscuela: this.administradorForm.get('idEscuela').value,
            estatus: this.administradorForm.get('estatus').value,
            imagen: this.administradorForm.get('imagen').value
        };
        return saveAdministrador;
    };
    UsuariosComponent.prototype.agregar = function () {
        this.inicializarForm();
        this.modal = 'agregar';
        $("#modal-modificar").modal();
    };
    UsuariosComponent.prototype.modificar = function (idAdministrador) {
        var _this = this;
        this.modal = 'modificar';
        this.abc.getAdministrador(idAdministrador).subscribe(function (data) {
            console.log(data);
            _this.administradorForm = _this.pf.group({
                idAdministrador: data.idAdministrador,
                nombre: data.nombre,
                apellidoP: data.apellidoP,
                apellidoM: data.apellidoM,
                email: data.email,
                contrasena: data.contrasena,
                idUsuario: data.idUsuario,
                idEscuela: data.idEscuela,
                estatus: data.estatus,
                imagen: data.imagen
            });
            $("#modal-modificar").modal();
        });
    };
    UsuariosComponent.prototype.obtenerAdministradores = function () {
        var _this = this;
        this.abc.getAdministradores()
            .subscribe(function (data) {
            _this.data = data;
            _this.chRef.detectChanges();
            // Now you can use jQuery DataTables :
            var table = $('table');
            _this.dataTable = table.DataTable();
        });
    };
    UsuariosComponent.prototype.status = function (id, estatus) {
        var _this = this;
        this.abc.getAdministrador(id)
            .subscribe(function (data) {
            _this.administrador = data;
            if (estatus == 0)
                _this.administrador.estatus = 1;
            else
                _this.administrador.estatus = 0;
            _this.modificarAdministrador(_this.administrador);
        });
    };
    UsuariosComponent.prototype.modificarAdministrador = function (administrador) {
        var _this = this;
        console.log(JSON.stringify(administrador));
        this.abc.updateAdministrador(administrador)
            .subscribe(function (res) {
            _this._success.next('Datos modificados con éxito');
            console.log('actualizado');
            _this.obtenerAdministradores();
        }, function (err) {
            _this._danger.next('A ocurrido un error intentalo de nuevo');
            console.log(err);
        });
    };
    UsuariosComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { return _this.staticAlertClosed = true; }, 20000);
        this._success.subscribe(function (message) { return _this.successMessage = message; });
        this._success.pipe(debounceTime(5000)).subscribe(function () { return _this.successMessage = null; });
        this._danger.subscribe(function (message) { return _this.dangerMessage = message; });
        this._danger.pipe(debounceTime(5000)).subscribe(function () { return _this.dangerMessage = null; });
        this.inicializarForm();
    };
    UsuariosComponent.prototype.inicializarForm = function () {
        this.administradorForm = this.pf.group({
            idAdministrador: [''],
            nombre: ['', [Validators.required]],
            apellidoP: ['', [Validators.required]],
            apellidoM: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            contrasena: [''],
            idUsuario: [''],
            idEscuela: ['', [Validators.required]],
            estatus: [''],
            imagen: ['']
        });
    };
    UsuariosComponent = __decorate([
        Component({
            selector: 'app-usuarios',
            templateUrl: './usuarios.component.html',
            styleUrls: ['./usuarios.component.css']
        }),
        __metadata("design:paramtypes", [AbcService, FormBuilder, ChangeDetectorRef])
    ], UsuariosComponent);
    return UsuariosComponent;
}());
export { UsuariosComponent };
//# sourceMappingURL=usuarios.component.js.map