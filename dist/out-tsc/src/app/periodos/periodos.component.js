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
import { AbcService } from '../abc.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
var PeriodosComponent = /** @class */ (function () {
    function PeriodosComponent(pf, abc, chRef) {
        this.pf = pf;
        this.abc = abc;
        this.chRef = chRef;
        this.modulo = 'Periodos por Sección';
        this.carreraSelect = [];
        this.data = [];
        this.datosTable = [];
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
    PeriodosComponent.prototype.agregar = function () {
        this.inicializarForm();
        this.modal = 'agregar';
        $("#modal").modal();
    };
    PeriodosComponent.prototype.modificar = function (idPeriodo, idSeccion, idCarrera) {
        var _this = this;
        this.abc.getPeriodo(idPeriodo, idSeccion, idCarrera)
            .subscribe(function (data) {
            _this.periodoForm = _this.pf.group({
                idPeriodo: data.idPeriodo,
                idSeccion: data.idSeccion,
                descripcion: data.descripcion,
                idCarrera: data.idCarrera
            });
            _this.modal = 'modificar';
            $("#modal").modal();
        });
    };
    PeriodosComponent.prototype.onSubmit = function () {
        var _this = this;
        this.periodo = this.savePeriodo();
        console.log(this.periodo);
        if (this.modal == 'modificar') {
            this.abc.updatePeriodo(this.periodo).subscribe(function (res) {
                _this.obtenerPeriodos();
                $("#modal").modal('hide');
                _this._success.next('Datos modificados con éxito');
            }, function (err) {
                console.log(err);
                _this._danger.next('A ocurrido un error intentalo de nuevo');
            });
        }
        else {
            this.abc.insertPeriodo(this.periodo).subscribe(function (res) {
                _this.obtenerPeriodos();
                $("#modal").modal('hide');
                _this._success.next('Datos guardados con éxito');
            }, function (err) {
                console.log(err);
                _this._danger.next('A ocurrido un error intentalo de nuevo');
            });
        }
    };
    PeriodosComponent.prototype.savePeriodo = function () {
        var savePeriodo = {
            idSeccion: this.idSeccion,
            idCarrera: this.periodoForm.get('idCarrera').value,
            idPeriodo: this.periodoForm.get('idPeriodo').value,
            descripcion: this.periodoForm.get('descripcion').value,
        };
        return savePeriodo;
    };
    PeriodosComponent.prototype.inicializarForm = function () {
        this.periodoForm = this.pf.group({
            idSeccion: [''],
            idCarrera: ['', [Validators.required]],
            descripcion: ['', [Validators.required]],
            idPeriodo: [''],
        });
    };
    PeriodosComponent.prototype.obtenerPeriodos = function () {
        var _this = this;
        this.datosTable = [];
        this.abc.getPeriodos(this.administradorUser.idEscuela)
            .subscribe(function (data) {
            _this.data = data;
            _this.chRef.detectChanges();
            var _loop_1 = function (item) {
                _this.abc.getCarrera(item.idCarrera).subscribe(function (carrera) {
                    _this.datosTable.push({ descripcion: item.descripcion, carrera: carrera.descripcion, idPeriodo: item.idPeriodo, idSeccion: item.idSeccion, idCarrera: item.idCarrera });
                });
            };
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var item = data_1[_i];
                _loop_1(item);
            }
            // Now you can use jQuery DataTables :
            var table = $('table');
            _this.dataTable = table.DataTable();
        });
    };
    PeriodosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.idUsuario = localStorage.getItem('idUsuario');
        this.abc.getAdministrador_Usuario(this.idUsuario).subscribe(function (data) {
            _this.administradorUser = data;
            _this.abc.getEscuela_Id(_this.administradorUser.idEscuela).subscribe(function (data) {
                _this.idSeccion = data.idSeccion;
            });
            _this.abc.getCarreras(_this.administradorUser.idEscuela).subscribe(function (data) {
                for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                    var carrera = data_2[_i];
                    _this.carreraSelect = _this.carreraSelect.concat([{ id: carrera.idCarrera, name: carrera.descripcion }]);
                }
            });
            _this.obtenerPeriodos();
        });
        setTimeout(function () { return _this.staticAlertClosed = true; }, 20000);
        this._success.subscribe(function (message) { return _this.successMessage = message; });
        this._success.pipe(debounceTime(5000)).subscribe(function () { return _this.successMessage = null; });
        this._danger.subscribe(function (message) { return _this.dangerMessage = message; });
        this._danger.pipe(debounceTime(5000)).subscribe(function () { return _this.dangerMessage = null; });
        this.inicializarForm();
    };
    PeriodosComponent = __decorate([
        Component({
            selector: 'app-periodos',
            templateUrl: './periodos.component.html',
            styleUrls: ['./periodos.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, AbcService, ChangeDetectorRef])
    ], PeriodosComponent);
    return PeriodosComponent;
}());
export { PeriodosComponent };
//# sourceMappingURL=periodos.component.js.map