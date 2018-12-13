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
var EdificiosComponent = /** @class */ (function () {
    function EdificiosComponent(pf, abc, chRef) {
        this.pf = pf;
        this.abc = abc;
        this.chRef = chRef;
        this.modulo = 'Edificios';
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
    EdificiosComponent.prototype.agregar = function () {
        this.inicializarForm();
        this.modal = 'agregar';
        $("#modal").modal();
    };
    EdificiosComponent.prototype.modificar = function (idEdificio) {
        var _this = this;
        this.abc.getEdificio(idEdificio)
            .subscribe(function (data) {
            _this.edificioForm = _this.pf.group({
                idEdificio: data.idEdificio,
                descripcion: data.descripcion,
                idEscuela: data.idEscuela,
                estatus: data.estatus
            });
            _this.modal = 'modificar';
            $("#modal").modal();
        });
    };
    EdificiosComponent.prototype.saveEdificio = function () {
        var saveEdificio = {
            idEdificio: this.edificioForm.get('idEdificio').value,
            descripcion: this.edificioForm.get('descripcion').value,
            idEscuela: this.administradorUser.idEscuela,
            estatus: this.edificioForm.get('estatus').value,
        };
        return saveEdificio;
    };
    EdificiosComponent.prototype.inicializarForm = function () {
        this.edificioForm = this.pf.group({
            idEdificio: [''],
            descripcion: ['', [Validators.required]],
            idEscuela: [this.administradorUser.idEscuela],
            estatus: [''],
        });
    };
    EdificiosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.idUsuario = localStorage.getItem('idUsuario');
        this.abc.getAdministrador_Usuario(this.idUsuario).subscribe(function (data) {
            _this.administradorUser = data;
            _this.obtenerEdificios();
        });
        setTimeout(function () { return _this.staticAlertClosed = true; }, 20000);
        this._success.subscribe(function (message) { return _this.successMessage = message; });
        this._success.pipe(debounceTime(5000)).subscribe(function () { return _this.successMessage = null; });
        this._danger.subscribe(function (message) { return _this.dangerMessage = message; });
        this._danger.pipe(debounceTime(5000)).subscribe(function () { return _this.dangerMessage = null; });
        this.inicializarForm();
    };
    EdificiosComponent.prototype.obtenerEdificios = function () {
        var _this = this;
        this.abc.getEdificios(this.administradorUser.idEscuela)
            .subscribe(function (data) {
            _this.data = data;
            _this.chRef.detectChanges();
            // Now you can use jQuery DataTables :
            var table = $('table');
            _this.dataTable = table.DataTable();
        });
    };
    EdificiosComponent.prototype.onSubmit = function () {
        var _this = this;
        this.edificio = this.saveEdificio();
        console.log(this.edificio);
        if (this.modal == 'modificar') {
            this.abc.updateEdificio(this.edificio).subscribe(function (res) {
                _this.obtenerEdificios();
                $("#modal").modal('hide');
                _this._success.next('Datos modificados con éxito');
            }, function (err) {
                console.log(err);
                _this._danger.next('A ocurrido un error intentalo de nuevo');
            });
        }
        else {
            this.abc.insertEdificio(this.edificio).subscribe(function (res) {
                _this.obtenerEdificios();
                $("#modal").modal('hide');
                _this._success.next('Datos guardados con éxito');
            }, function (err) {
                console.log(err);
                _this._danger.next('A ocurrido un error intentalo de nuevo');
            });
        }
    };
    EdificiosComponent.prototype.modificarEdificio = function (edificio) {
        var _this = this;
        console.log(JSON.stringify(edificio));
        this.abc.updateEdificio(edificio)
            .subscribe(function (res) {
            _this._success.next('Datos modificados con éxito');
            console.log('actualizado');
            _this.obtenerEdificios();
        }, function (err) {
            _this._danger.next('A ocurrido un error intentalo de nuevo');
            console.log(err);
        });
    };
    EdificiosComponent.prototype.status = function (idEdificio, estatus) {
        var _this = this;
        this.abc.getEdificio(idEdificio)
            .subscribe(function (data) {
            _this.edificio = data;
            if (estatus == 0)
                _this.edificio.estatus = 1;
            else
                _this.edificio.estatus = 0;
            _this.modificarEdificio(_this.edificio);
        });
    };
    EdificiosComponent = __decorate([
        Component({
            selector: 'app-edificios',
            templateUrl: './edificios.component.html',
            styleUrls: ['./edificios.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, AbcService, ChangeDetectorRef])
    ], EdificiosComponent);
    return EdificiosComponent;
}());
export { EdificiosComponent };
//# sourceMappingURL=edificios.component.js.map