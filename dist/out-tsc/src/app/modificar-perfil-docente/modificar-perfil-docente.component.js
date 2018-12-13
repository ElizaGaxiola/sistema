var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AbcService } from '../abc.service';
import { debounceTime } from 'rxjs/operators';
var ModificarPerfilDocenteComponent = /** @class */ (function () {
    function ModificarPerfilDocenteComponent(pf, abc) {
        this.pf = pf;
        this.abc = abc;
        this.modulo = 'Modificar Perfil';
        this.docente = {
            idDocente: 0,
            nombre: '',
            apellidoP: '',
            apellidoM: '',
            fechaNac: '',
            nss: '',
            telefono: '',
            titulo: '',
            curp: '',
            sexo: '',
            idMunicipio: 0,
            colonia: '',
            calle: '',
            numero: '',
            cp: '',
            urlImagen: '',
            usuarioId: 0,
            estatus: 0,
            escuelaId: 0,
            idUsuario: 0,
            idTipo: 0,
            usuario: '',
            contrasena: ''
        };
        this.loader = false;
        this._success = new Subject();
        this._danger = new Subject();
        this.staticAlertClosed = false;
    }
    ModificarPerfilDocenteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.idUsuario = localStorage.getItem('idUsuario');
        setTimeout(function () { return _this.staticAlertClosed = true; }, 20000);
        this._success.subscribe(function (message) { return _this.successMessage = message; });
        this._success.pipe(debounceTime(5000)).subscribe(function () { return _this.successMessage = null; });
        this._danger.subscribe(function (message) { return _this.dangerMessage = message; });
        this._danger.pipe(debounceTime(5000)).subscribe(function () { return _this.dangerMessage = null; });
        this.inicializarForm();
    };
    ModificarPerfilDocenteComponent.prototype.inicializarForm = function () {
        this.docenteForm = this.pf.group({
            idDocente: [''],
            nombre: ['', [Validators.required]],
            apellidoP: ['', [Validators.required]],
            apellidoM: ['', [Validators.required]],
            fechaNac: [''],
            nss: [''],
            telefono: ['', [Validators.required]],
            titulo: [''],
            curp: [''],
            sexo: [''],
            idMunicipio: [''],
            colonia: [''],
            calle: [''],
            numero: [''],
            cp: [''],
            urlImagen: [''],
            usuarioId: [''],
            estatus: [''],
            escuelaId: [''],
            idUsuario: [''],
            idTipo: [''],
            usuario: ['', [Validators.required, Validators.email]],
            contrasena: [''],
        });
        this.llenar();
    };
    ModificarPerfilDocenteComponent.prototype.llenar = function () {
        var _this = this;
        this.abc.getDocente_Usuario(this.idUsuario).subscribe(function (user) {
            _this.abc.getDocenete(user.idDocente).subscribe(function (data) {
                console.log(data);
                _this.fecha = data.fechaNac.split('-');
                _this.bsValue = new Date(_this.fecha[0], _this.fecha[1] - 1, _this.fecha[2]);
                console.log(_this.fecha);
                _this.docenteForm = _this.pf.group({
                    idDocente: data.idDocente,
                    nombre: data.nombre,
                    apellidoP: data.apellidoP,
                    apellidoM: data.apellidoM,
                    fechaNac: data.fechaNac,
                    nss: data.nss,
                    telefono: data.telefono,
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
                _this.imagen = data.urlImagen;
                console.log(_this.docenteForm);
            });
        });
    };
    ModificarPerfilDocenteComponent.prototype.saveDocente = function () {
        var saveDocente = {
            idDocente: this.docenteForm.get('idDocente').value,
            nombre: this.docenteForm.get('nombre').value,
            apellidoP: this.docenteForm.get('apellidoP').value,
            apellidoM: this.docenteForm.get('apellidoM').value,
            fechaNac: this.docenteForm.get('fechaNac').value,
            nss: this.docenteForm.get('nss').value,
            telefono: this.docenteForm.get('telefono').value,
            titulo: this.docenteForm.get('titulo').value,
            curp: this.docenteForm.get('curp').value,
            sexo: this.docenteForm.get('sexo').value,
            idMunicipio: this.docenteForm.get('idMunicipio').value,
            colonia: this.docenteForm.get('colonia').value,
            calle: this.docenteForm.get('calle').value,
            numero: this.docenteForm.get('numero').value,
            cp: this.docenteForm.get('cp').value,
            urlImagen: this.imagen,
            usuarioId: this.docenteForm.get('usuarioId').value,
            estatus: this.docenteForm.get('estatus').value,
            escuelaId: this.docenteForm.get('escuelaId').value,
            idUsuario: this.docenteForm.get('idUsuario').value,
            idTipo: this.docenteForm.get('idTipo').value,
            usuario: this.docenteForm.get('usuario').value,
            contrasena: this.docenteForm.get('contrasena').value,
        };
        return saveDocente;
    };
    ModificarPerfilDocenteComponent.prototype.onSubmit = function () {
        var _this = this;
        this.docente = this.saveDocente();
        console.log(this.docente);
        this.abc.updateDocenete(this.docente).subscribe(function (res) {
            _this._success.next('Datos modificados con éxito');
        }, function (err) {
            _this._danger.next('A ocurrido un error intentalo de nuevo');
            console.log(err);
        });
    };
    ModificarPerfilDocenteComponent.prototype.cargandoImagen = function (e) {
        var _this = this;
        var img = e.target;
        if (img.files.length > 0) {
            this.loader = true;
            var form = new FormData();
            form.append('file', img.files[0]);
            this.abc.subirImagenAdmin(form).subscribe(function (resp) {
                _this.loader = false;
                if (resp.status) {
                    _this.imagen = resp.generatedName;
                }
                else {
                    _this._danger.next('Revise la extención de su imagen');
                }
            }, function (error) {
                _this.loader = false;
                alert('Imagen supera el tamaño permitido');
            });
        }
    };
    ModificarPerfilDocenteComponent = __decorate([
        Component({
            selector: 'app-modificar-perfil-docente',
            templateUrl: './modificar-perfil-docente.component.html',
            styleUrls: ['./modificar-perfil-docente.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, AbcService])
    ], ModificarPerfilDocenteComponent);
    return ModificarPerfilDocenteComponent;
}());
export { ModificarPerfilDocenteComponent };
//# sourceMappingURL=modificar-perfil-docente.component.js.map