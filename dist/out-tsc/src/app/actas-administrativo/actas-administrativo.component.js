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
var ActasAdministrativoComponent = /** @class */ (function () {
    function ActasAdministrativoComponent(abc, pf, chRef) {
        this.abc = abc;
        this.pf = pf;
        this.chRef = chRef;
        this.modulo = 'Abrir Actas';
        this.data = [];
        this.dtOptions = {};
        this.periodoSelect = [];
        this._success = new Subject();
        this._danger = new Subject();
        this.staticAlertClosed = false;
    }
    ActasAdministrativoComponent.prototype.agregar = function () {
        this.inicializarForm();
        this.modal = 'agregar';
        $("#modal").modal();
    };
    ActasAdministrativoComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { return _this.staticAlertClosed = true; }, 20000);
        this._success.subscribe(function (message) { return _this.successMessage = message; });
        this._success.pipe(debounceTime(5000)).subscribe(function () { return _this.successMessage = null; });
        this._danger.subscribe(function (message) { return _this.dangerMessage = message; });
        this._danger.pipe(debounceTime(5000)).subscribe(function () { return _this.dangerMessage = null; });
        this.idUsuario = localStorage.getItem('idUsuario');
        this.abc.getAdministrador_Usuario(this.idUsuario).subscribe(function (data) {
            _this.administradorUser = data;
            _this.abc.getPeriodos(_this.administradorUser.idEscuela).subscribe(function (data) {
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var item = data_1[_i];
                    _this.id = { idSeccion: item.idSeccion, idPeriodo: item.idPeriodo, idCarrera: item.idCarrera };
                    _this.periodoSelect = _this.periodoSelect.concat([{ id: _this.id, name: item.descripcion }]);
                }
                _this.obtenerActas();
            });
        });
        this.inicializarForm();
    };
    ActasAdministrativoComponent.prototype.onSubmit = function () {
        var _this = this;
        this.acta = this.saveActa();
        console.log(this.acta);
        this.abc.insertCal(this.acta).subscribe(function (res) {
            _this.obtenerActas();
            $("#modal").modal('hide');
            _this._success.next('Datos guardados con éxito');
        }, function (err) {
            console.log(err);
            _this._danger.next('A ocurrido un error intentalo de nuevo');
        });
    };
    ActasAdministrativoComponent.prototype.saveActa = function () {
        var saveActa = {
            idConfCalificacion: this.actaForm.get('idConfCalificacion').value,
            idSeccion: this.periodo.idSeccion,
            idPeriodo: this.periodo.idPeriodo,
            idCarrera: this.periodo.idCarrera,
            fechaFin: this.actaForm.get('fechaFin').value,
            fechaIni: this.actaForm.get('fechaIni').value,
            numEvaluacion: this.actaForm.get('numEvaluacion').value,
            idEscuela: this.administradorUser.idEscuela
        };
        return saveActa;
    };
    ActasAdministrativoComponent.prototype.obtenerActas = function () {
        var _this = this;
        this.data = [];
        this.abc.getCals(this.administradorUser.idEscuela)
            .subscribe(function (data) {
            console.log(data);
            var _loop_1 = function (d) {
                console.log(d.idSeccion);
                _this.abc.getSeccion(d.idSeccion).subscribe(function (sec) {
                    _this.abc.getPeriodo(d.idPeriodo, d.idSeccion, d.idCarrera).subscribe(function (per) {
                        _this.abc.getCarrera(d.idCarrera).subscribe(function (carr) {
                            _this.data = _this.data.concat([{ seccion: sec.descripcion, periodo: per.descripcion, carrera: carr.descripcion, numEvaluacion: d.numEvaluacion, fechaIni: d.fecahIni, fechaFin: d.fechaFin }]);
                        });
                    });
                });
            };
            for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                var d = data_2[_i];
                _loop_1(d);
            }
            _this.chRef.detectChanges();
            // Now you can use jQuery DataTables :
            var table = $('table');
            _this.dataTable = table.DataTable();
        });
    };
    ActasAdministrativoComponent.prototype.inicializarForm = function () {
        this.actaForm = this.pf.group({
            idConfCalificacion: [''],
            idSeccion: [''],
            idPeriodo: [''],
            idCarrera: [''],
            fechaFin: ['', [Validators.required]],
            fechaIni: ['', [Validators.required]],
            numEvaluacion: ['', [Validators.required]],
            idEscuela: ['']
        });
    };
    ActasAdministrativoComponent = __decorate([
        Component({
            selector: 'app-actas-administrativo',
            templateUrl: './actas-administrativo.component.html',
            styleUrls: ['./actas-administrativo.component.css']
        }),
        __metadata("design:paramtypes", [AbcService, FormBuilder, ChangeDetectorRef])
    ], ActasAdministrativoComponent);
    return ActasAdministrativoComponent;
}());
export { ActasAdministrativoComponent };
//# sourceMappingURL=actas-administrativo.component.js.map