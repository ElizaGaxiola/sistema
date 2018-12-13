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
import { debounceTime } from 'rxjs/operators';
import { AbcService } from '../abc.service';
var AulasComponent = /** @class */ (function () {
    function AulasComponent(pf, abc, chRef) {
        this.pf = pf;
        this.abc = abc;
        this.chRef = chRef;
        this.modulo = 'Aulas';
        this.edificioSelect = [];
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
    AulasComponent.prototype.agregar = function () {
        this.inicializarForm();
        this.modal = 'agregar';
        $("#modal").modal();
    };
    AulasComponent.prototype.modificar = function (idAula) {
        var _this = this;
        this.abc.getAula(idAula)
            .subscribe(function (data) {
            _this.aulaForm = _this.pf.group({
                idAula: data.idAula,
                idEdificio: data.idEdificio,
                descripcion: data.descripcion,
                estatus: data.estatus,
                edificio: data.edificio
            });
            _this.modal = 'modificar';
            $("#modal").modal();
        });
    };
    AulasComponent.prototype.obtenerAulas = function () {
        var _this = this;
        this.abc.getAulas(this.administradorUser.idEscuela)
            .subscribe(function (data) {
            _this.data = data;
            _this.chRef.detectChanges();
            // Now you can use jQuery DataTables :
            var table = $('table');
            _this.dataTable = table.DataTable();
            console.log(data);
        });
    };
    AulasComponent.prototype.modificarAula = function (aula) {
        var _this = this;
        console.log(JSON.stringify(aula));
        this.abc.updateAula(aula)
            .subscribe(function (res) {
            _this._success.next('Datos modificados con éxito');
            console.log('actualizado');
            _this.obtenerAulas();
        }, function (err) {
            _this._danger.next('A ocurrido un error intentalo de nuevo');
            console.log(err);
        });
    };
    AulasComponent.prototype.status = function (idAula, estatus) {
        var _this = this;
        this.abc.getAula(idAula)
            .subscribe(function (data) {
            _this.aula = data;
            if (estatus == 0)
                _this.aula.estatus = 1;
            else
                _this.aula.estatus = 0;
            _this.modificarAula(_this.aula);
        });
    };
    AulasComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.idUsuario = localStorage.getItem('idUsuario');
        this.abc.getAdministrador_Usuario(this.idUsuario).subscribe(function (data) {
            _this.administradorUser = data;
            _this.obtenerAulas();
            _this.abc.getEdificios(_this.administradorUser.idEscuela).subscribe(function (data2) {
                console.log(data2);
                if (data2 != null) {
                    for (var _i = 0, data2_1 = data2; _i < data2_1.length; _i++) {
                        var edificio = data2_1[_i];
                        _this.edificioSelect = _this.edificioSelect.concat([{ id: edificio.idEdificio, name: edificio.descripcion }]);
                    }
                }
            });
        });
        setTimeout(function () { return _this.staticAlertClosed = true; }, 20000);
        this._success.subscribe(function (message) { return _this.successMessage = message; });
        this._success.pipe(debounceTime(5000)).subscribe(function () { return _this.successMessage = null; });
        this._danger.subscribe(function (message) { return _this.dangerMessage = message; });
        this._danger.pipe(debounceTime(5000)).subscribe(function () { return _this.dangerMessage = null; });
        this.inicializarForm();
    };
    AulasComponent.prototype.saveAula = function () {
        var saveAula = {
            idAula: this.aulaForm.get('idAula').value,
            idEdificio: this.aulaForm.get('idEdificio').value,
            descripcion: this.aulaForm.get('descripcion').value,
            estatus: this.aulaForm.get('estatus').value,
            edificio: this.aulaForm.get('edificio').value
        };
        return saveAula;
    };
    AulasComponent.prototype.onSubmit = function () {
        var _this = this;
        this.aula = this.saveAula();
        console.log(this.aula);
        if (this.modal == 'modificar') {
            this.abc.updateAula(this.aula).subscribe(function (res) {
                _this.obtenerAulas();
                $("#modal").modal('hide');
                _this._success.next('Datos guardados con éxito');
            }, function (err) {
                console.log(err);
                _this._danger.next('A ocurrido un error intentalo de nuevo');
            });
        }
        else {
            this.abc.insertAula(this.aula).subscribe(function (res) {
                _this.obtenerAulas();
                $("#modal-modificar").modal('hide');
                _this._success.next('Datos modificados con éxito');
            }, function (err) {
                console.log(err);
                _this._danger.next('A ocurrido un error intentalo de nuevo');
            });
        }
    };
    AulasComponent.prototype.inicializarForm = function () {
        this.aulaForm = this.pf.group({
            idAula: [''],
            idEdificio: ['', [Validators.required]],
            descripcion: ['', [Validators.required]],
            estatus: [''],
            edificio: [''],
        });
    };
    AulasComponent = __decorate([
        Component({
            selector: 'app-aulas',
            templateUrl: './aulas.component.html',
            styleUrls: ['./aulas.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, AbcService, ChangeDetectorRef])
    ], AulasComponent);
    return AulasComponent;
}());
export { AulasComponent };
//# sourceMappingURL=aulas.component.js.map