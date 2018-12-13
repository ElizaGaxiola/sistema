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
import { Subject } from 'rxjs';
import { AbcService } from '../abc.service';
import { debounceTime } from 'rxjs/operators';
var CarrerasComponent = /** @class */ (function () {
    function CarrerasComponent(pf, abc, chRef) {
        this.pf = pf;
        this.abc = abc;
        this.chRef = chRef;
        this.modulo = 'Carreras';
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
    CarrerasComponent.prototype.agregar = function () {
        this.inicializarForm();
        this.modal = 'agregar';
        $("#modal").modal();
    };
    CarrerasComponent.prototype.modificar = function (idCarrera) {
        var _this = this;
        this.abc.getCarrera(idCarrera)
            .subscribe(function (data) {
            _this.carreraForm = _this.pf.group({
                idCarrera: data.idCarrera,
                descripcion: data.descripcion,
                precio: data.precio,
                idEscuela: data.idEscuela,
                estatus: data.estatus
            });
            _this.modal = 'modificar';
            $("#modal").modal();
        });
    };
    CarrerasComponent.prototype.obtenerCarreras = function () {
        var _this = this;
        this.abc.getCarreras(this.administradorUser.idEscuela)
            .subscribe(function (data) {
            _this.data = data;
            _this.chRef.detectChanges();
            // Now you can use jQuery DataTables :
            var table = $('table');
            _this.dataTable = table.DataTable();
        });
    };
    CarrerasComponent.prototype.modificarCarrera = function (carrera) {
        var _this = this;
        console.log(JSON.stringify(carrera));
        this.abc.updateCarrera(carrera)
            .subscribe(function (res) {
            _this._success.next('Datos modificados con éxito');
            console.log('actualizado');
            _this.obtenerCarreras();
        }, function (err) {
            _this._danger.next('A ocurrido un error intentalo de nuevo');
            console.log(err);
        });
    };
    CarrerasComponent.prototype.status = function (idCarrera, estatus) {
        var _this = this;
        this.abc.getCarrera(idCarrera)
            .subscribe(function (data) {
            _this.carrera = data;
            if (estatus == 0)
                _this.carrera.estatus = 1;
            else
                _this.carrera.estatus = 0;
            _this.modificarCarrera(_this.carrera);
        });
    };
    CarrerasComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.idUsuario = localStorage.getItem('idUsuario');
        this.abc.getAdministrador_Usuario(this.idUsuario).subscribe(function (data) {
            _this.administradorUser = data;
            _this.obtenerCarreras();
        });
        setTimeout(function () { return _this.staticAlertClosed = true; }, 20000);
        this._success.subscribe(function (message) { return _this.successMessage = message; });
        this._success.pipe(debounceTime(5000)).subscribe(function () { return _this.successMessage = null; });
        this._danger.subscribe(function (message) { return _this.dangerMessage = message; });
        this._danger.pipe(debounceTime(5000)).subscribe(function () { return _this.dangerMessage = null; });
        this.inicializarForm();
    };
    CarrerasComponent.prototype.onSubmit = function () {
        var _this = this;
        this.carrera = this.saveCarrera();
        console.log(this.carrera);
        if (this.modal == 'modificar') {
            this.abc.updateCarrera(this.carrera).subscribe(function (res) {
                _this.obtenerCarreras();
                $("#modal").modal('hide');
                _this._success.next('Datos modificados con éxito');
            }, function (err) {
                console.log(err);
                _this._danger.next('A ocurrido un error intentalo de nuevo');
            });
        }
        else {
            this.abc.insertCarrera(this.carrera).subscribe(function (res) {
                _this.obtenerCarreras();
                $("#modal").modal('hide');
                _this._success.next('Datos guardados con éxito');
            }, function (err) {
                console.log(err);
                _this._danger.next('A ocurrido un error intentalo de nuevo');
            });
        }
    };
    CarrerasComponent.prototype.saveCarrera = function () {
        var saveCarrera = {
            idCarrera: this.carreraForm.get('idCarrera').value,
            descripcion: this.carreraForm.get('descripcion').value,
            precio: this.carreraForm.get('precio').value,
            idEscuela: this.administradorUser.idEscuela,
            estatus: this.carreraForm.get('estatus').value,
        };
        return saveCarrera;
    };
    CarrerasComponent.prototype.inicializarForm = function () {
        this.carreraForm = this.pf.group({
            idCarrera: [''],
            descripcion: ['', [Validators.required]],
            precio: ['', [Validators.required, Validators.pattern('[0-9]*.[0-9]*')]],
            idEscuela: [''],
            estatus: [0]
        });
    };
    CarrerasComponent = __decorate([
        Component({
            selector: 'app-carreras',
            templateUrl: './carreras.component.html',
            styleUrls: ['./carreras.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, AbcService, ChangeDetectorRef])
    ], CarrerasComponent);
    return CarrerasComponent;
}());
export { CarrerasComponent };
//# sourceMappingURL=carreras.component.js.map