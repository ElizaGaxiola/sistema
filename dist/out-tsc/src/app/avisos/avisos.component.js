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
var AvisosComponent = /** @class */ (function () {
    function AvisosComponent(abc, pf, chRef) {
        this.abc = abc;
        this.pf = pf;
        this.chRef = chRef;
        this.modulo = 'Avisos';
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
        this.tipos = [
            { id: 1, name: 'Ultimas noticias' },
            { id: 2, name: 'Proximos exámenes' },
            { id: 3, name: 'Reunión de padres de familia' },
            { id: 4, name: 'Suspención de clases' }
        ];
        this._success = new Subject();
        this._danger = new Subject();
        this.staticAlertClosed = false;
        this.data = [];
        this.datosTable = [];
    }
    AvisosComponent.prototype.agregar = function () {
        this.inicializarForm();
        this.modal = 'agregar';
        $("#modal-modificar").modal();
    };
    AvisosComponent.prototype.modificar = function (idAviso) {
        var _this = this;
        console.log(idAviso);
        this.abc.getAviso(idAviso)
            .subscribe(function (data) {
            _this.avisoForm = _this.pf.group({
                idAviso: data.idAviso,
                titulo: data.titulo,
                mensaje: data.mensaje,
                fechaIni: data.fechaIni,
                fechaFin: data.fechaFin,
                idEscuela: data.idEscuela,
                idTipo: Number(data.idTipo)
            });
            _this.modal = 'modificar';
            $("#modal-modificar").modal();
        });
    };
    AvisosComponent.prototype.eliminar = function (idAviso) {
        var _this = this;
        this.abc.deleteAviso(idAviso).subscribe(function (RES) {
            _this._success.next('Datos eliminados con éxito');
            _this.obtenerAvisos();
        }, function (err) {
            console.log(err);
            _this._danger.next('A ocurrido un error intentalo de nuevo');
        });
    };
    AvisosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.table = $('#table');
        this.idUsuario = localStorage.getItem('idUsuario');
        this.abc.getAdministrador_Usuario(this.idUsuario).subscribe(function (data) {
            _this.administradorUser = data;
            _this.obtenerAvisos();
        });
        setTimeout(function () { return _this.staticAlertClosed = true; }, 20000);
        this._success.subscribe(function (message) { return _this.successMessage = message; });
        this._success.pipe(debounceTime(5000)).subscribe(function () { return _this.successMessage = null; });
        this._danger.subscribe(function (message) { return _this.dangerMessage = message; });
        this._danger.pipe(debounceTime(5000)).subscribe(function () { return _this.dangerMessage = null; });
        this.inicializarForm();
    };
    AvisosComponent.prototype.onSubmit = function () {
        var _this = this;
        this.aviso = this.saveAviso();
        if (this.modal == 'agregar') {
            console.log(this.aviso);
            this.abc.insertAviso(this.aviso).subscribe(function (res) {
                $("#modal-modificar").modal('hide');
                _this.obtenerAvisos();
                _this._success.next('Datos guardados con éxito');
            }, function (err) {
                console.log(err);
                _this._danger.next('A ocurrido un error intentalo de nuevo');
            });
        }
        else {
            this.abc.updateAviso(this.aviso).subscribe(function (res) {
                $("#modal-modificar").modal('hide');
                _this.obtenerAvisos();
                _this._success.next('Datos modificados con éxito');
            }, function (err) {
                console.log(err);
                _this._danger.next('A ocurrido un error intentalo de nuevo');
            });
        }
    };
    AvisosComponent.prototype.obtenerAvisos = function () {
        var _this = this;
        this.datosTable = [];
        console.log(this.datosTable);
        var tipo;
        this.abc.getAvisos(this.administradorUser.idEscuela)
            .subscribe(function (data) {
            console.log(data);
            _this.data = data;
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var d = data_1[_i];
                if (d.idTipo == 1) {
                    tipo = 'Ultimas noticias';
                }
                else if (d.idTipo == 2) {
                    tipo = 'Proximos exámenes';
                }
                else if (d.idTipo == 3) {
                    tipo = 'Reunión de padres de familia';
                }
                else {
                    tipo = 'Suspención de clases';
                }
                _this.datosTable = _this.datosTable.concat([{ titulo: d.titulo, fechaIni: d.fechaIni, fechaFin: d.fechaFin, idAviso: d.idAviso, tipo: tipo }]);
            }
            _this.chRef.detectChanges();
            // Now you can use jQuery DataTables :
            _this.dataTable = _this.table.DataTable();
        });
    };
    AvisosComponent.prototype.saveAviso = function () {
        var saveAviso = {
            idAviso: this.avisoForm.get('idAviso').value,
            titulo: this.avisoForm.get('titulo').value,
            mensaje: this.avisoForm.get('mensaje').value,
            fechaFin: this.avisoForm.get('fechaFin').value,
            fechaIni: this.avisoForm.get('fechaIni').value,
            idEscuela: this.administradorUser.idEscuela,
            idTipo: this.avisoForm.get('idTipo').value
        };
        return saveAviso;
    };
    AvisosComponent.prototype.inicializarForm = function () {
        this.avisoForm = this.pf.group({
            idAviso: [''],
            titulo: ['', [Validators.required]],
            mensaje: ['', [Validators.required]],
            fechaIni: ['', [Validators.required]],
            fechaFin: ['', [Validators.required]],
            idEscuela: [],
            idTipo: ['', [Validators.required]]
        });
    };
    AvisosComponent = __decorate([
        Component({
            selector: 'app-avisos',
            templateUrl: './avisos.component.html',
            styleUrls: ['./avisos.component.css']
        }),
        __metadata("design:paramtypes", [AbcService, FormBuilder, ChangeDetectorRef])
    ], AvisosComponent);
    return AvisosComponent;
}());
export { AvisosComponent };
//# sourceMappingURL=avisos.component.js.map