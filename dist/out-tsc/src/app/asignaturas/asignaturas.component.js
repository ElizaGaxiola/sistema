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
var AsignaturasComponent = /** @class */ (function () {
    function AsignaturasComponent(pf, abc, chRef) {
        this.pf = pf;
        this.abc = abc;
        this.chRef = chRef;
        this.modulo = 'Asignaturas';
        this.data = [];
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
        this._success = new Subject();
        this._danger = new Subject();
        this.staticAlertClosed = false;
    }
    AsignaturasComponent.prototype.agregar = function () {
        this.inicializarForm();
        this.modal = 'agregar';
        $("#modal").modal();
    };
    AsignaturasComponent.prototype.modificar = function (idMateria) {
        var _this = this;
        this.abc.getAsignatura(idMateria)
            .subscribe(function (data) {
            _this.asignaturaForm = _this.pf.group({
                idMateria: data.idMateria,
                nombre: data.nombre,
                creditos: data.creditos,
                idEscuela: data.idEscuela
            });
            _this.modal = 'modificar';
            $("#modal").modal();
        });
    };
    AsignaturasComponent.prototype.obtenerAsignaturas = function () {
        var _this = this;
        this.abc.getAsignaturas(this.administradorUser.idEscuela)
            .subscribe(function (data) {
            _this.data = data;
            _this.chRef.detectChanges();
            // Now you can use jQuery DataTables :
            var table = $('table');
            _this.dataTable = table.DataTable();
        });
    };
    AsignaturasComponent.prototype.inicializarForm = function () {
        this.asignaturaForm = this.pf.group({
            nombre: ['', [Validators.required]],
            creditos: ['', [Validators.required]],
            idMateria: [''],
            idEscuela: ['']
        });
    };
    AsignaturasComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.idUsuario = localStorage.getItem('idUsuario');
        this.abc.getAdministrador_Usuario(this.idUsuario).subscribe(function (data) {
            _this.administradorUser = data;
            _this.obtenerAsignaturas();
        });
        setTimeout(function () { return _this.staticAlertClosed = true; }, 20000);
        this._success.subscribe(function (message) { return _this.successMessage = message; });
        this._success.pipe(debounceTime(5000)).subscribe(function () { return _this.successMessage = null; });
        this._danger.subscribe(function (message) { return _this.dangerMessage = message; });
        this._danger.pipe(debounceTime(5000)).subscribe(function () { return _this.dangerMessage = null; });
        this.inicializarForm();
    };
    AsignaturasComponent.prototype.onSubmit = function () {
        var _this = this;
        this.asignatura = this.saveAsignatura();
        console.log(this.asignatura);
        if (this.modal == 'modificar') {
            this.abc.updateAsignatura(this.asignatura).subscribe(function (res) {
                _this.obtenerAsignaturas();
                $("#modal").modal('hide');
                _this._success.next('Datos modificados con éxito');
            }, function (err) {
                console.log(err);
                _this._danger.next('A ocurrido un error intentalo de nuevo');
            });
        }
        else {
            this.abc.insertAsignatura(this.asignatura).subscribe(function (res) {
                _this.obtenerAsignaturas();
                $("#modal").modal('hide');
                _this._success.next('Datos guardados con éxito');
            }, function (err) {
                console.log(err);
                _this._danger.next('A ocurrido un error intentalo de nuevo');
            });
        }
    };
    AsignaturasComponent.prototype.saveAsignatura = function () {
        var saveAsignatura = {
            idMateria: this.asignaturaForm.get('idMateria').value,
            nombre: this.asignaturaForm.get('nombre').value,
            creditos: this.asignaturaForm.get('creditos').value,
            idEscuela: this.administradorUser.idEscuela
        };
        return saveAsignatura;
    };
    AsignaturasComponent = __decorate([
        Component({
            selector: 'app-asignaturas',
            templateUrl: './asignaturas.component.html',
            styleUrls: ['./asignaturas.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, AbcService, ChangeDetectorRef])
    ], AsignaturasComponent);
    return AsignaturasComponent;
}());
export { AsignaturasComponent };
//# sourceMappingURL=asignaturas.component.js.map