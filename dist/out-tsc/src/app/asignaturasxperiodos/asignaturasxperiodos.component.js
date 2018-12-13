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
var AsignaturasxperiodosComponent = /** @class */ (function () {
    function AsignaturasxperiodosComponent(pf, abc, chRef) {
        this.pf = pf;
        this.abc = abc;
        this.chRef = chRef;
        this.modulo = 'Asignaturas Por Periodo';
        this.periodoSelect = [];
        this.asignaturaSelect = [];
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
        this.dtOptions = {};
        this.data = [];
    }
    AsignaturasxperiodosComponent.prototype.agregar = function () {
        this.inicializarForm();
        $("#modal").modal();
    };
    AsignaturasxperiodosComponent.prototype.eliminar = function (idMateria) {
        var _this = this;
        this.abc.deteleAsignaturaPeriodo(idMateria, this.periodo.idSeccion, this.periodo.idPeriodo, this.periodo.idCarrera).subscribe(function (RES) {
            _this._success.next('Datos guardados con éxito');
            _this.change();
        }, function (err) {
            console.log(err);
            _this._danger.next('A ocurrido un error intentalo de nuevo');
        });
    };
    AsignaturasxperiodosComponent.prototype.change = function () {
        var _this = this;
        this.abc.getAsignaturasPeriodo(this.periodo.idSeccion, this.periodo.idPeriodo, this.periodo.idCarrera)
            .subscribe(function (data) {
            _this.data = data;
            _this.chRef.detectChanges();
            // Now you can use jQuery DataTables :
            var table = $('table');
            _this.dataTable = table.DataTable();
        });
    };
    AsignaturasxperiodosComponent.prototype.inicializarForm = function () {
        this.asignaturaPeriodoForm = this.pf.group({
            idMateria: ['', [Validators.required]],
            idCarrera: [''],
            idSeccion: [''],
            idPeriodo: ['']
        });
    };
    AsignaturasxperiodosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.idUsuario = localStorage.getItem('idUsuario');
        this.abc.getAdministrador_Usuario(this.idUsuario).subscribe(function (data) {
            _this.administradorUser = data;
            _this.abc.getPeriodos(_this.administradorUser.idEscuela)
                .subscribe(function (data) {
                _this.chRef.detectChanges();
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var item = data_1[_i];
                    _this.id = { idSeccion: item.idSeccion, idPeriodo: item.idPeriodo, idCarrera: item.idCarrera };
                    _this.periodoSelect = _this.periodoSelect.concat([{ id: _this.id, name: item.descripcion }]);
                }
            });
            _this.abc.getAsignaturas(_this.administradorUser.idEscuela)
                .subscribe(function (data) {
                for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                    var item = data_2[_i];
                    _this.asignaturaSelect = _this.asignaturaSelect.concat([{ id: item.idMateria, name: item.nombre }]);
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
    AsignaturasxperiodosComponent.prototype.onSubmit = function () {
        var _this = this;
        this.asignaturaPeriodo = this.saveAsignaturaPeriodo();
        this.abc.insertAsignaturaPeriodo(this.asignaturaPeriodo).subscribe(function (res) {
            _this.change();
            $("#modal").modal('hide');
            _this._success.next('Datos guardados con éxito');
        }, function (err) {
            console.log(err);
            _this._danger.next('A ocurrido un error intentalo de nuevo');
        });
    };
    AsignaturasxperiodosComponent.prototype.saveAsignaturaPeriodo = function () {
        var saveAsignaturaPeriodo = {
            idMateria: this.asignaturaPeriodoForm.get('idMateria').value,
            idCarrera: this.periodo.idCarrera,
            idSeccion: this.periodo.idSeccion,
            idPeriodo: this.periodo.idPeriodo,
        };
        return saveAsignaturaPeriodo;
    };
    AsignaturasxperiodosComponent = __decorate([
        Component({
            selector: 'app-asignaturasxperiodos',
            templateUrl: './asignaturasxperiodos.component.html',
            styleUrls: ['./asignaturasxperiodos.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, AbcService, ChangeDetectorRef])
    ], AsignaturasxperiodosComponent);
    return AsignaturasxperiodosComponent;
}());
export { AsignaturasxperiodosComponent };
//# sourceMappingURL=asignaturasxperiodos.component.js.map