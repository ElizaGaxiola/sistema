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
var PersonaldocenteComponent = /** @class */ (function () {
    function PersonaldocenteComponent(abc, pf, chRef) {
        var _this = this;
        this.abc = abc;
        this.pf = pf;
        this.chRef = chRef;
        this.modulo = 'Personal Docente';
        this.sexoSelect = [
            { id: 1, name: 'Masculino' },
            { id: 2, name: 'Femenino' },
            { id: 3, name: 'Indefinido' }
        ];
        this.estadosSelect = [];
        this.municipiosSelect = [];
        this.dataModel = ['101', '102', '103'];
        this.data = [];
        this._success = new Subject();
        this._danger = new Subject();
        this.staticAlertClosed = false;
        this.abc.getEstados().subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var estado = data_1[_i];
                _this.estadosSelect = _this.estadosSelect.concat([{ id: estado.idEstado, name: estado.nombre }]);
            }
        });
    }
    PersonaldocenteComponent.prototype.change = function () {
        var _this = this;
        console.log(this.idEstado);
        this.abc.getMunicipioEdo(this.idEstado).subscribe(function (data) {
            _this.municipiosSelect = [];
            if (data != null) {
                for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                    var municipio = data_2[_i];
                    _this.municipiosSelect = _this.municipiosSelect.concat([{ id: municipio.idMunicipio, name: municipio.nombre }]);
                }
            }
        });
    };
    PersonaldocenteComponent.prototype.obtenerDocentes = function () {
        var _this = this;
        this.abc.getDocenetes(this.administradorUser.idEscuela)
            .subscribe(function (data) {
            _this.data = data;
            _this.chRef.detectChanges();
            // Now you can use jQuery DataTables :
            var table = $('table');
            _this.dataTable = table.DataTable();
            console.log(data);
        });
    };
    PersonaldocenteComponent.prototype.agregar = function () {
        this.inicializarForm();
        this.modal = 'agregar';
        $("#modal").modal();
        alert('enter');
    };
    PersonaldocenteComponent.prototype.modificar = function (idDocente) {
        var _this = this;
        this.modal = 'modificar';
        this.abc.getDocenete(idDocente).subscribe(function (data) {
            console.log(data);
            _this.fecha = data.fechaNac.split('-');
            _this.bsValue = new Date(_this.fecha[0], _this.fecha[1] - 1, _this.fecha[2]);
            console.log(_this.fecha);
            _this.abc.getMunicipio(data.idMunicipio).subscribe(function (data) {
                _this.idEstado = data.idEstado;
                _this.change();
            });
            _this.docenteForm = _this.pf.group({
                idDocente: data.idDocente,
                nombre: data.nombre,
                apellidoP: data.apellidoP,
                apellidoM: data.apellidoM,
                fechaNac: data.fechaNac,
                nss: data.nss,
                telefonol: data.telefono,
                titulo: data.titulo,
                curp: data.curp,
                sexo: Number(data.sexo),
                idMunicipio: data.idMunicipio,
                colonia: data.colonia,
                calle: data.calle,
                numero: data.numero,
                cp: data.cp,
                urlImagen: data.urlImagen,
                usuarioId: data.usuarioId,
                estatus: data.estatus,
                escuelaId: data.escuelaId,
                idUsuario: data.idUsuario,
                idTipo: data.idTipo,
                usuario: data.usuario,
                contrasena: data.contrasena,
            });
            $("#modal").modal();
        });
    };
    PersonaldocenteComponent.prototype.modificarDocente = function (docente) {
        var _this = this;
        console.log(docente);
        this.abc.updateDocenete(docente)
            .subscribe(function (res) {
            _this._success.next('Datos modificados con éxito');
            console.log('actualizado');
            _this.obtenerDocentes();
        }, function (err) {
            _this._danger.next('A ocurrido un error intentalo de nuevo');
            console.log(err);
        });
    };
    PersonaldocenteComponent.prototype.status = function (id, estatus) {
        var _this = this;
        this.abc.getDocenete(id)
            .subscribe(function (data) {
            _this.docente = data;
            if (estatus == 0)
                _this.docente.estatus = 1;
            else
                _this.docente.estatus = 0;
            _this.modificarDocente(_this.docente);
        });
    };
    PersonaldocenteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.idUsuario = localStorage.getItem('idUsuario');
        this.abc.getAdministrador_Usuario(this.idUsuario).subscribe(function (data) {
            _this.administradorUser = data;
            _this.obtenerDocentes();
        });
        setTimeout(function () { return _this.staticAlertClosed = true; }, 20000);
        this._success.subscribe(function (message) { return _this.successMessage = message; });
        this._success.pipe(debounceTime(5000)).subscribe(function () { return _this.successMessage = null; });
        this._danger.subscribe(function (message) { return _this.dangerMessage = message; });
        this._danger.pipe(debounceTime(5000)).subscribe(function () { return _this.dangerMessage = null; });
        this.inicializarForm();
    };
    PersonaldocenteComponent.prototype.onSubmit = function () {
        var _this = this;
        this.docente = this.saveDocente();
        if (this.modal == 'modificar') {
            this.abc.updateDocenete(this.docente).subscribe(function (res) {
                _this.obtenerDocentes();
                _this._success.next('Datos modificados con éxito');
                $("#modal").modal('hide');
            }, function (err) {
                _this._danger.next('A ocurrido un error intentalo de nuevo');
                console.log(err);
            });
        }
        else {
            this.abc.insertDocenete(this.docente).subscribe(function (res) {
                _this.obtenerDocentes();
                $("#modal-modificar").modal('hide');
                _this._success.next('Datos modificados con éxito');
            }, function (err) {
                console.log(err);
                _this._danger.next('A ocurrido un error intentalo de nuevo');
            });
        }
    };
    PersonaldocenteComponent.prototype.inicializarForm = function () {
        this.docenteForm = this.pf.group({
            idDocente: [''],
            nombre: ['', [Validators.required]],
            apellidoP: ['', [Validators.required]],
            apellidoM: ['', [Validators.required]],
            fechaNac: ['', [Validators.required]],
            nss: ['', [Validators.required]],
            telefonol: ['', [Validators.required]],
            titulo: ['', [Validators.required]],
            curp: ['', [Validators.required]],
            sexo: ['', [Validators.required]],
            idMunicipio: ['', [Validators.required]],
            colonia: ['', [Validators.required]],
            calle: ['', [Validators.required]],
            numero: ['', [Validators.required]],
            cp: ['', [Validators.required]],
            urlImagen: [''],
            usuarioId: [''],
            estatus: [''],
            escuelaId: [1],
            idUsuario: [''],
            idTipo: [''],
            usuario: ['', [Validators.required, Validators.email]],
            contrasena: [''],
        });
    };
    PersonaldocenteComponent.prototype.saveDocente = function () {
        var saveDocente = {
            idDocente: this.docenteForm.get('idDocente').value,
            nombre: this.docenteForm.get('nombre').value,
            apellidoP: this.docenteForm.get('apellidoP').value,
            apellidoM: this.docenteForm.get('apellidoM').value,
            fechaNac: this.docenteForm.get('fechaNac').value,
            nss: this.docenteForm.get('nss').value,
            telefono: this.docenteForm.get('telefonol').value,
            titulo: this.docenteForm.get('titulo').value,
            curp: this.docenteForm.get('curp').value,
            sexo: this.docenteForm.get('sexo').value,
            idMunicipio: this.docenteForm.get('idMunicipio').value,
            colonia: this.docenteForm.get('colonia').value,
            calle: this.docenteForm.get('calle').value,
            numero: this.docenteForm.get('numero').value,
            cp: this.docenteForm.get('cp').value,
            urlImagen: this.docenteForm.get('urlImagen').value,
            usuarioId: this.docenteForm.get('usuarioId').value,
            estatus: this.docenteForm.get('estatus').value,
            escuelaId: this.administradorUser.idEscuela,
            idUsuario: this.docenteForm.get('idUsuario').value,
            idTipo: this.docenteForm.get('idTipo').value,
            usuario: this.docenteForm.get('usuario').value,
            contrasena: this.docenteForm.get('contrasena').value,
        };
        return saveDocente;
    };
    PersonaldocenteComponent = __decorate([
        Component({
            selector: 'app-personaldocente',
            templateUrl: './personaldocente.component.html',
            styleUrls: ['./personaldocente.component.css']
        }),
        __metadata("design:paramtypes", [AbcService, FormBuilder, ChangeDetectorRef])
    ], PersonaldocenteComponent);
    return PersonaldocenteComponent;
}());
export { PersonaldocenteComponent };
//# sourceMappingURL=personaldocente.component.js.map