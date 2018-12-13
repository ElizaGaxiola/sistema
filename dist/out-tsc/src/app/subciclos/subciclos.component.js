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
var SubciclosComponent = /** @class */ (function () {
    function SubciclosComponent(abc, pf, chRef) {
        this.abc = abc;
        this.pf = pf;
        this.chRef = chRef;
        this.modulo = 'Subciclos';
        this.cicloSelect = [];
        this.data = [];
        this._success = new Subject();
        this._danger = new Subject();
        this.staticAlertClosed = false;
    }
    SubciclosComponent.prototype.agregar = function () {
        this.inicializarForm();
        this.modal = 'agregar';
        $("#modal").modal();
    };
    SubciclosComponent.prototype.modificar = function (idCiclo, idSubCiclo) {
        var _this = this;
        this.abc.getSubCiclo(idCiclo, idSubCiclo)
            .subscribe(function (data) {
            _this.fecha = data.fechaIni.split('-');
            _this.bsValueIni = new Date(_this.fecha[0], _this.fecha[1] - 1, _this.fecha[2]);
            _this.fecha = data.fechaFin.split('-');
            _this.bsValueFin = new Date(_this.fecha[0], _this.fecha[1] - 1, _this.fecha[2]);
            _this.subcicloForm = _this.pf.group({
                idCiclo: data.idCiclo,
                idSubCiclo: data.idSubCiclo,
                descripcion: data.descripcion,
                fechaFin: data.fechaFin,
                fechaIni: data.fechaIni
            });
            _this.modal = 'modificar';
            $("#modal").modal();
        });
    };
    SubciclosComponent.prototype.obtenerSubCiclos = function () {
        var _this = this;
        this.abc.getSubCiclos(this.administradorUser.idEscuela)
            .subscribe(function (data) {
            _this.data = data;
            _this.chRef.detectChanges();
            // Now you can use jQuery DataTables :
            var table = $('table');
            _this.dataTable = table.DataTable();
            console.log(data);
        });
    };
    SubciclosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.idUsuario = localStorage.getItem('idUsuario');
        this.abc.getAdministrador_Usuario(this.idUsuario).subscribe(function (data) {
            _this.administradorUser = data;
            _this.abc.getCiclos(_this.administradorUser.idEscuela).subscribe(function (data) {
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var ciclo = data_1[_i];
                    _this.cicloSelect = _this.cicloSelect.concat([{ id: ciclo.idCiclo, name: ciclo.descripcion }]);
                }
            });
            _this.obtenerSubCiclos();
        });
        setTimeout(function () { return _this.staticAlertClosed = true; }, 20000);
        this._success.subscribe(function (message) { return _this.successMessage = message; });
        this._success.pipe(debounceTime(5000)).subscribe(function () { return _this.successMessage = null; });
        this._danger.subscribe(function (message) { return _this.dangerMessage = message; });
        this._danger.pipe(debounceTime(5000)).subscribe(function () { return _this.dangerMessage = null; });
        this.inicializarForm();
    };
    SubciclosComponent.prototype.onSubmit = function () {
        var _this = this;
        this.subciclo = this.saveSubciclo();
        if (this.modal == 'modificar') {
            this.abc.updateSubCiclo(this.subciclo).subscribe(function (res) {
                _this.obtenerSubCiclos();
                _this._success.next('Datos modificados con éxito');
                $("#modal").modal('hide');
            }, function (err) {
                _this._danger.next('A ocurrido un error intentalo de nuevo');
                console.log(err);
            });
        }
        else {
            this.abc.insertSubCiclo(this.subciclo).subscribe(function (res) {
                _this.obtenerSubCiclos();
                _this._success.next('Datos Agregados con éxito');
                $("#modal").modal('hide');
            }, function (err) {
                _this._danger.next('A ocurrido un error intentalo de nuevo');
                console.log(err);
            });
        }
    };
    SubciclosComponent.prototype.saveSubciclo = function () {
        var saveSubciclo = {
            idCiclo: this.subcicloForm.get('idCiclo').value,
            idSubCiclo: this.subcicloForm.get('idSubCiclo').value,
            descripcion: this.subcicloForm.get('descripcion').value,
            fechaFin: this.subcicloForm.get('fechaFin').value,
            fechaIni: this.subcicloForm.get('fechaIni').value,
        };
        return saveSubciclo;
    };
    SubciclosComponent.prototype.inicializarForm = function () {
        this.subcicloForm = this.pf.group({
            idCiclo: ['', [Validators.required]],
            idSubCiclo: [''],
            descripcion: ['', [Validators.required]],
            fechaFin: ['', [Validators.required]],
            fechaIni: ['', [Validators.required]],
        });
    };
    SubciclosComponent = __decorate([
        Component({
            selector: 'app-subciclos',
            templateUrl: './subciclos.component.html',
            styleUrls: ['./subciclos.component.css']
        }),
        __metadata("design:paramtypes", [AbcService, FormBuilder, ChangeDetectorRef])
    ], SubciclosComponent);
    return SubciclosComponent;
}());
export { SubciclosComponent };
//# sourceMappingURL=subciclos.component.js.map