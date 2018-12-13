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
import { AuthService } from '../auth.service';
import { AbcService } from '../abc.service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
var ModificarPerfilAlumnoComponent = /** @class */ (function () {
    function ModificarPerfilAlumnoComponent(pf, abc, auth) {
        this.pf = pf;
        this.abc = abc;
        this.auth = auth;
        this.modulo = 'Modificar Perfil';
        this.alumno = {
            idAlumno: [''],
            matricula: [''],
            nombre: [''],
            apellidoP: [''],
            apellidoM: [''],
            fechaNac: [''],
            email: [''],
            telefono: [''],
            celular: [''],
            curp: [''],
            sexo: [''],
            idMunicipio: [''],
            colonia: [''],
            calle: [''],
            numero: [''],
            cp: [''],
            urlImagen: [''],
            idUsuario: [''],
            idEscuela: [''],
            cardexDoc: [''],
            actaNacDoc: [''],
            comprobanteDoc: [''],
            credencialDoc: ''
        };
        this.municipio = '';
        this.estado = '';
        this.urlImagen = '';
        this.loader = false;
        this._success = new Subject();
        this._danger = new Subject();
        this.staticAlertClosed = false;
    }
    ModificarPerfilAlumnoComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { return _this.staticAlertClosed = true; }, 20000);
        this._success.subscribe(function (message) { return _this.successMessage = message; });
        this._success.pipe(debounceTime(5000)).subscribe(function () { return _this.successMessage = null; });
        this._danger.subscribe(function (message) { return _this.dangerMessage = message; });
        this._danger.pipe(debounceTime(5000)).subscribe(function () { return _this.dangerMessage = null; });
        this.idUsuario = localStorage.getItem('idUsuario');
        this.abc.getAlumnoUsuario(this.idUsuario).subscribe(function (data) {
            _this.alumno = data;
            _this.urlImagen = data.urlImagen;
            _this.abc.getMunicipio(_this.alumno.idMunicipio).subscribe(function (mun) {
                _this.municipio = mun.nombre;
                _this.abc.getEstado(mun.idEstado).subscribe(function (est) {
                    _this.estado = est.nombre;
                });
            });
            console.log(_this.alumno);
        });
        this.modalumnoForm = this.pf.group({
            matricula: [''],
            contrasena: ['', [Validators.required]],
        });
    };
    ModificarPerfilAlumnoComponent.prototype.onSubmit = function () {
        var _this = this;
        this.modalumno = this.saveModalumno();
        console.log(this.modalumno);
        this.abc.updateContrAlumno(this.modalumno).subscribe(function (res) {
            _this._success.next('Datos modificados con éxito');
            console.log('actualizado');
        }, function (err) {
            _this._danger.next('A ocurrido un error intentalo de nuevo');
            console.log(err);
        });
    };
    ModificarPerfilAlumnoComponent.prototype.saveModalumno = function () {
        var saveModalumno = {
            matricula: this.alumno.matricula,
            contrasena: this.modalumnoForm.get('contrasena').value,
        };
        return saveModalumno;
    };
    ModificarPerfilAlumnoComponent.prototype.cargandoImagen = function (e) {
        var _this = this;
        var img = e.target;
        if (img.files.length > 0) {
            this.loader = true;
            var form = new FormData();
            form.append('file', img.files[0]);
            this.abc.subirImagenAlumno(form).subscribe(function (resp) {
                _this.loader = false;
                if (resp.status) {
                    _this.urlImagen = resp.generatedName;
                    var datos = {
                        idAlumno: _this.alumno.idAlumno,
                        urlImagen: _this.urlImagen
                    };
                    _this.abc.updateImagenAlumno(datos).subscribe(function (res) {
                        _this._success.next('Datos modificados con éxito');
                        console.log('actualizado');
                    }, function (err) {
                        _this._danger.next('A ocurrido un error intentalo de nuevo');
                        console.log(err);
                    });
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
    ModificarPerfilAlumnoComponent = __decorate([
        Component({
            selector: 'app-modificar-perfil-alumno',
            templateUrl: './modificar-perfil-alumno.component.html',
            styleUrls: ['./modificar-perfil-alumno.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, AbcService, AuthService])
    ], ModificarPerfilAlumnoComponent);
    return ModificarPerfilAlumnoComponent;
}());
export { ModificarPerfilAlumnoComponent };
//# sourceMappingURL=modificar-perfil-alumno.component.js.map