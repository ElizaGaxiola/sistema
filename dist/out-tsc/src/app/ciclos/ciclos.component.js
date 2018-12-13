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
var CiclosComponent = /** @class */ (function () {
    function CiclosComponent(pf, abc, chRef) {
        this.pf = pf;
        this.abc = abc;
        this.chRef = chRef;
        this.modulo = 'Ciclos';
        this.dtOptions = {};
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
    CiclosComponent.prototype.agregar = function () {
        this.inicializarForm();
        this.modal = 'agregar';
        $("#modal").modal();
    };
    CiclosComponent.prototype.modificar = function (idCiclo) {
        var _this = this;
        this.abc.getCiclo(idCiclo)
            .subscribe(function (data) {
            _this.fecha = data.fechaIni.split('-');
            _this.bsValueIni = new Date(_this.fecha[0], _this.fecha[1] - 1, _this.fecha[2]);
            _this.fecha = data.fechaFin.split('-');
            _this.bsValueFin = new Date(_this.fecha[0], _this.fecha[1] - 1, _this.fecha[2]);
            _this.cicloForm = _this.pf.group({
                idCiclo: data.idCiclo,
                descripcion: data.descripcion,
                fechaFin: data.fechaFin,
                fechaIni: data.fechaIni,
                idEscuela: data.idEscuela
            });
            _this.modal = 'modificar';
            $("#modal").modal();
        });
    };
    CiclosComponent.prototype.obtenerCiclos = function () {
        var _this = this;
        this.abc.getCiclos(this.administradorUser.idEscuela)
            .subscribe(function (data) {
            _this.data = data;
            _this.chRef.detectChanges();
            // Now you can use jQuery DataTables :
            var table = $('table');
            _this.dataTable = table.DataTable();
            console.log(data);
        });
    };
    CiclosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.idUsuario = localStorage.getItem('idUsuario');
        this.abc.getAdministrador_Usuario(this.idUsuario).subscribe(function (data) {
            _this.administradorUser = data;
            _this.obtenerCiclos();
        });
        setTimeout(function () { return _this.staticAlertClosed = true; }, 20000);
        this._success.subscribe(function (message) { return _this.successMessage = message; });
        this._success.pipe(debounceTime(5000)).subscribe(function () { return _this.successMessage = null; });
        this._danger.subscribe(function (message) { return _this.dangerMessage = message; });
        this._danger.pipe(debounceTime(5000)).subscribe(function () { return _this.dangerMessage = null; });
        this.inicializarForm();
    };
    CiclosComponent.prototype.onSubmit = function () {
        var _this = this;
        this.ciclo = this.saveCiclo();
        console.log(this.ciclo);
        if (this.modal == 'modificar') {
            this.abc.updateCiclo(this.ciclo).subscribe(function (res) {
                _this.obtenerCiclos();
                $("#modal").modal('hide');
                _this._success.next('Datos guardados con éxito');
            }, function (err) {
                console.log(err);
                _this._danger.next('A ocurrido un error intentalo de nuevo');
            });
        }
        else {
            this.abc.insertCiclo(this.ciclo).subscribe(function (res) {
                _this.obtenerCiclos();
                $("#modal").modal('hide');
                _this._success.next('Datos modificados con éxito');
            }, function (err) {
                console.log(err);
                _this._danger.next('A ocurrido un error intentalo de nuevo');
            });
        }
    };
    CiclosComponent.prototype.saveCiclo = function () {
        var saveCiclo = {
            idCiclo: this.cicloForm.get('idCiclo').value,
            descripcion: this.cicloForm.get('descripcion').value,
            fechaFin: this.cicloForm.get('fechaFin').value,
            fechaIni: this.cicloForm.get('fechaIni').value,
            idEscuela: this.administradorUser.idEscuela,
        };
        return saveCiclo;
    };
    CiclosComponent.prototype.inicializarForm = function () {
        this.cicloForm = this.pf.group({
            idCiclo: [''],
            descripcion: ['', [Validators.required]],
            fechaFin: ['', [Validators.required]],
            fechaIni: ['', [Validators.required]],
            idEscuela: [''],
        });
    };
    CiclosComponent = __decorate([
        Component({
            selector: 'app-ciclos',
            templateUrl: './ciclos.component.html',
            styleUrls: ['./ciclos.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, AbcService, ChangeDetectorRef])
    ], CiclosComponent);
    return CiclosComponent;
}());
export { CiclosComponent };
//# sourceMappingURL=ciclos.component.js.map