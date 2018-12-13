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
var EscuelasComponent = /** @class */ (function () {
    function EscuelasComponent(abc, pf, chRef) {
        var _this = this;
        this.abc = abc;
        this.pf = pf;
        this.chRef = chRef;
        this.modulo = 'Escuelas';
        this.data = [];
        this.seccionesSelect = [];
        this.estadosSelect = [];
        this.municipiosSelect = [];
        this._success = new Subject();
        this._danger = new Subject();
        this.staticAlertClosed = false;
        this.obtenerEscuelas();
        this.abc.getSecciones().subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var seccion = data_1[_i];
                _this.seccionesSelect = _this.seccionesSelect.concat([{ id: seccion.idSeccion, name: seccion.descripcion }]);
            }
        });
        this.abc.getEstados().subscribe(function (data) {
            for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                var estado = data_2[_i];
                _this.estadosSelect = _this.estadosSelect.concat([{ id: estado.idEstado, name: estado.nombre }]);
            }
        });
    }
    EscuelasComponent.prototype.change = function () {
        var _this = this;
        console.log(this.idEstado);
        this.abc.getMunicipioEdo(this.idEstado).subscribe(function (data) {
            _this.municipiosSelect = [];
            if (data != null) {
                for (var _i = 0, data_3 = data; _i < data_3.length; _i++) {
                    var municipio = data_3[_i];
                    _this.municipiosSelect = _this.municipiosSelect.concat([{ id: municipio.idMunicipio, name: municipio.nombre }]);
                }
            }
        });
    };
    EscuelasComponent.prototype.agregar = function () {
        this.inicializarForm();
        this.modal = 'agregar';
        $("#modal-modificar").modal();
    };
    EscuelasComponent.prototype.onSubmit = function () {
        var _this = this;
        this.escuela = this.saveEscuela();
        console.log(this.escuela);
        if (this.modal == 'modificar') {
            this.abc.updateEscuela(this.escuela).subscribe(function (res) {
                _this.obtenerEscuelas();
                $("#modal-modificar").modal('hide');
                _this._success.next('Datos guardados con éxito');
            }, function (err) {
                console.log(err);
                _this._danger.next('A ocurrido un error intentalo de nuevo');
            });
        }
        else {
            this.abc.insertEscuela(this.escuela).subscribe(function (res) {
                _this.obtenerEscuelas();
                $("#modal-modificar").modal('hide');
                _this._success.next('Datos modificados con éxito');
            }, function (err) {
                console.log(err);
                _this._danger.next('A ocurrido un error intentalo de nuevo');
            });
        }
    };
    EscuelasComponent.prototype.saveEscuela = function () {
        var saveEscuela = {
            idEscuela: this.escuelaForm.get('idEscuela').value,
            idSeccion: this.escuelaForm.get('idSeccion').value,
            clave: this.escuelaForm.get('clave').value,
            nombre: this.escuelaForm.get('nombre').value,
            idMunicipio: this.escuelaForm.get('idMunicipio').value,
            colonia: this.escuelaForm.get('colonia').value,
            calle: this.escuelaForm.get('calle').value,
            cp: this.escuelaForm.get('cp').value,
            numero: this.escuelaForm.get('numero').value,
            email: this.escuelaForm.get('email').value,
            telefono: this.escuelaForm.get('telefono').value,
            estatus: this.escuelaForm.get('estatus').value
        };
        return saveEscuela;
    };
    EscuelasComponent.prototype.modificar = function (clave) {
        var _this = this;
        this.abc.getEscuela(clave)
            .subscribe(function (data) {
            _this.abc.getMunicipio(data.idMunicipio).subscribe(function (data) {
                _this.idEstado = data.idEstado;
                _this.change();
            });
            _this.escuelaForm = _this.pf.group({
                idEscuela: data.idEscuela,
                idSeccion: data.idSeccion,
                clave: data.clave,
                nombre: data.nombre,
                idMunicipio: data.idMunicipio,
                colonia: data.colonia,
                calle: data.calle,
                cp: data.cp,
                numero: data.numero,
                email: data.email,
                telefono: data.telefono,
                estatus: data.estatus
            });
            _this.modal = 'modificar';
            $("#modal-modificar").modal();
        });
    };
    EscuelasComponent.prototype.obtenerEscuelas = function () {
        var _this = this;
        this.abc.getEscuelas()
            .subscribe(function (data) {
            _this.data = data;
            _this.chRef.detectChanges();
            // Now you can use jQuery DataTables :
            var table = $('table');
            _this.dataTable = table.DataTable();
        });
    };
    EscuelasComponent.prototype.obtenerEscuela = function (clave) {
        var _this = this;
        this.abc.getEscuela(clave)
            .subscribe(function (data) {
            _this.escuela = data;
        });
    };
    EscuelasComponent.prototype.modificarEscuela = function (escuela) {
        var _this = this;
        console.log(JSON.stringify(escuela));
        this.abc.updateEscuela(escuela)
            .subscribe(function (res) {
            _this._success.next('Datos modificados con éxito');
            console.log('actualizado');
            _this.obtenerEscuelas();
        }, function (err) {
            _this._danger.next('A ocurrido un error intentalo de nuevo');
            console.log(err);
        });
    };
    EscuelasComponent.prototype.status = function (clave, estatus) {
        var _this = this;
        this.abc.getEscuela(clave)
            .subscribe(function (data) {
            _this.escuela = data;
            if (estatus == 0)
                _this.escuela.estatus = 1;
            else
                _this.escuela.estatus = 0;
            _this.modificarEscuela(_this.escuela);
        });
    };
    EscuelasComponent.prototype.inicializarForm = function () {
        this.escuelaForm = this.pf.group({
            idEscuela: [''],
            idSeccion: ['', [Validators.required]],
            clave: ['', [Validators.required]],
            nombre: ['', [Validators.required]],
            idMunicipio: ['', [Validators.required]],
            colonia: ['', [Validators.required]],
            calle: ['', [Validators.required]],
            cp: ['', [Validators.required]],
            numero: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            telefono: ['', [Validators.required]],
            estatus: [''],
        });
    };
    EscuelasComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { return _this.staticAlertClosed = true; }, 20000);
        this._success.subscribe(function (message) { return _this.successMessage = message; });
        this._success.pipe(debounceTime(5000)).subscribe(function () { return _this.successMessage = null; });
        this._danger.subscribe(function (message) { return _this.dangerMessage = message; });
        this._danger.pipe(debounceTime(5000)).subscribe(function () { return _this.dangerMessage = null; });
        this.inicializarForm();
    };
    EscuelasComponent = __decorate([
        Component({
            selector: 'app-escuelas',
            templateUrl: './escuelas.component.html',
            styleUrls: ['./escuelas.component.css']
        }),
        __metadata("design:paramtypes", [AbcService, FormBuilder, ChangeDetectorRef])
    ], EscuelasComponent);
    return EscuelasComponent;
}());
export { EscuelasComponent };
//# sourceMappingURL=escuelas.component.js.map