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
var PreinscripcionesDatosComponent = /** @class */ (function () {
    function PreinscripcionesDatosComponent(abc, pf, chRef) {
        this.abc = abc;
        this.pf = pf;
        this.chRef = chRef;
        this.escuelaSelect = [];
        this.sexoSelect = [
            { id: 1, name: 'Masculino' },
            { id: 2, name: 'Femenino' },
            { id: 3, name: 'Indefinido' }
        ];
        this.estadosSelect = [];
        this.municipiosSelect = [];
        this.carreraSelect = [];
        this.loader = false;
        this._success = new Subject();
        this._danger = new Subject();
        this.urlImagen = 'profile.png';
    }
    PreinscripcionesDatosComponent.prototype.change = function () {
        var _this = this;
        console.log(this.idEstado);
        this.abc.getMunicipioEdo(this.idEstado).subscribe(function (data) {
            _this.municipiosSelect = [];
            if (data != null) {
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var municipio = data_1[_i];
                    _this.municipiosSelect = _this.municipiosSelect.concat([{ id: municipio.idMunicipio, name: municipio.nombre }]);
                }
            }
        });
    };
    PreinscripcionesDatosComponent.prototype.changeEsc = function () {
        var _this = this;
        console.log(this.idEscuela);
        this.carreraSelect = [];
        this.abc.getCarreras(this.idEscuela).subscribe(function (carreras) {
            for (var _i = 0, carreras_1 = carreras; _i < carreras_1.length; _i++) {
                var carrera = carreras_1[_i];
                _this.carreraSelect = _this.carreraSelect.concat([{ id: carrera.idCarrera, name: carrera.descripcion }]);
            }
        });
    };
    PreinscripcionesDatosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._success.subscribe(function (message) { return _this.successMessage = message; });
        this._success.pipe(debounceTime(5000)).subscribe(function () { return _this.successMessage = null; });
        this._danger.subscribe(function (message) { return _this.dangerMessage = message; });
        this._danger.pipe(debounceTime(5000)).subscribe(function () { return _this.dangerMessage = null; });
        this.abc.getEstados().subscribe(function (data) {
            for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                var estado = data_2[_i];
                _this.estadosSelect = _this.estadosSelect.concat([{ id: estado.idEstado, name: estado.nombre }]);
            }
        });
        this.abc.getEscuelas().subscribe(function (data) {
            for (var _i = 0, data_3 = data; _i < data_3.length; _i++) {
                var escuela = data_3[_i];
                _this.escuelaSelect = _this.escuelaSelect.concat([{ id: escuela.idEscuela, name: escuela.nombre }]);
            }
        });
        this.preinscripcionForm = this.pf.group({
            nombre: ['', [Validators.required]],
            apellidoP: ['', [Validators.required]],
            apellidoM: ['', [Validators.required]],
            curp: ['', [Validators.required]],
            sexo: ['', [Validators.required]],
            fechaNac: ['', [Validators.required]],
            idMunicipio: ['', [Validators.required]],
            telefonoTutor: ['', [Validators.required]],
            telefono: [''],
            idEstado: [''],
            celular: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            colonia: ['', [Validators.required]],
            cp: ['', [Validators.required]],
            calle: ['', [Validators.required]],
            numero: ['', [Validators.required]],
            nombreTutor: ['', [Validators.required]],
            apellidoPTutor: ['', [Validators.required]],
            apellidoMTutor: ['', [Validators.required]],
            fechaNacTutor: ['', [Validators.required]],
            emailTutor: ['', [Validators.required, Validators.email]],
            urlImagen: ['', [Validators.required]],
            urlActa: ['', [Validators.required]],
            urlConstancia: ['', [Validators.required]],
            urlCredencial: ['', [Validators.required]],
            urlComprobante: ['', [Validators.required]],
            idEscuela: ['', [Validators.required]],
            idCarrera: ['', [Validators.required]],
        });
    };
    PreinscripcionesDatosComponent.prototype.onSubmit = function () {
        var _this = this;
        this.preinscripcion = this.savePreinscripcion();
        console.log(this.preinscripcion);
        this.abc.insertPreinscripcion(this.preinscripcion).subscribe(function (resp) {
            _this.loader = false;
            if (resp.status) {
                _this.idCandidato = resp.msg;
                $("#modal").modal();
            }
            else {
                _this._danger.next('A ocurrido un error, por favor vuelve a intentarlo');
            }
        }, function (error) {
            _this.loader = false;
            _this._danger.next(' error vuelva a intentarlo ');
        });
    };
    PreinscripcionesDatosComponent.prototype.savePreinscripcion = function () {
        var savePreinscripcion = {
            nombre: this.preinscripcionForm.get('nombre').value,
            apellidoP: this.preinscripcionForm.get('apellidoP').value,
            apellidoM: this.preinscripcionForm.get('apellidoM').value,
            curp: this.preinscripcionForm.get('curp').value,
            sexo: this.preinscripcionForm.get('sexo').value,
            fechaNac: this.preinscripcionForm.get('fechaNac').value,
            idMunicipio: this.preinscripcionForm.get('idMunicipio').value,
            idEstado: this.preinscripcionForm.get('idEstado').value,
            telefono: this.preinscripcionForm.get('telefono').value,
            celular: this.preinscripcionForm.get('celular').value,
            email: this.preinscripcionForm.get('email').value,
            emailTutor: this.preinscripcionForm.get('emailTutor').value,
            cp: this.preinscripcionForm.get('cp').value,
            colonia: this.preinscripcionForm.get('colonia').value,
            calle: this.preinscripcionForm.get('calle').value,
            numero: this.preinscripcionForm.get('numero').value,
            nombreTutor: this.preinscripcionForm.get('nombreTutor').value,
            apellidoPTutor: this.preinscripcionForm.get('apellidoPTutor').value,
            apellidoMTutor: this.preinscripcionForm.get('apellidoMTutor').value,
            fechaNacTutor: this.preinscripcionForm.get('fechaNacTutor').value,
            telefonoTutor: this.preinscripcionForm.get('telefonoTutor').value,
            urlImagen: this.urlImagen,
            urlActa: this.urlActa,
            urlConstancia: this.urlConstancia,
            urlCredencial: this.urlCredencial,
            urlComprobante: this.urlComprobante,
            idEscuela: this.preinscripcionForm.get('idEscuela').value,
            idCarrera: this.preinscripcionForm.get('idCarrera').value,
        };
        return savePreinscripcion;
    };
    PreinscripcionesDatosComponent.prototype.cargandoImagen = function (e) {
        var _this = this;
        var img = e.target;
        if (img.files.length > 0) {
            this.loader = true;
            var form = new FormData();
            form.append('file', img.files[0]);
            this.abc.subirImagenAsp(form).subscribe(function (resp) {
                _this.loader = false;
                if (resp.status) {
                    _this.urlImagen = resp.generatedName;
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
    PreinscripcionesDatosComponent.prototype.cargandoUrlActa = function (e) {
        var _this = this;
        var doc = e.target;
        if (doc.files.length > 0) {
            this.loader = true;
            var form = new FormData();
            form.append('file', doc.files[0]);
            this.abc.subirDoc(form).subscribe(function (resp) {
                _this.loader = false;
                if (resp.status) {
                    _this.urlActa = resp.generatedName;
                }
                else {
                    _this._danger.next('Revise la extención de su documento');
                }
            }, function (error) {
                _this.loader = false;
                _this._danger.next('documento supera el tamaño permitido');
            });
        }
    };
    PreinscripcionesDatosComponent.prototype.cargandoUrlConstancia = function (e) {
        var _this = this;
        var doc = e.target;
        if (doc.files.length > 0) {
            this.loader = true;
            var form = new FormData();
            form.append('file', doc.files[0]);
            this.abc.subirDoc(form).subscribe(function (resp) {
                _this.loader = false;
                if (resp.status) {
                    _this.urlConstancia = resp.generatedName;
                }
                else {
                    _this._danger.next('Revise la extención de su documento');
                }
            }, function (error) {
                _this.loader = false;
                _this._danger.next('documento supera el tamaño permitido');
            });
        }
    };
    PreinscripcionesDatosComponent.prototype.cargandoUrlCredencial = function (e) {
        var _this = this;
        var doc = e.target;
        if (doc.files.length > 0) {
            this.loader = true;
            var form = new FormData();
            form.append('file', doc.files[0]);
            this.abc.subirDoc(form).subscribe(function (resp) {
                _this.loader = false;
                if (resp.status) {
                    _this.urlCredencial = resp.generatedName;
                }
                else {
                    _this._danger.next('Revise la extención de su documento');
                }
            }, function (error) {
                _this.loader = false;
                _this._danger.next('documento supera el tamaño permitido');
            });
        }
    };
    PreinscripcionesDatosComponent.prototype.cargandoUrlComprobante = function (e) {
        var _this = this;
        var doc = e.target;
        if (doc.files.length > 0) {
            this.loader = true;
            var form = new FormData();
            form.append('file', doc.files[0]);
            this.abc.subirDoc(form).subscribe(function (resp) {
                _this.loader = false;
                if (resp.status) {
                    _this.urlComprobante = resp.generatedName;
                }
                else {
                    _this._danger.next('Revise la extención de su documento');
                }
            }, function (error) {
                _this.loader = false;
                _this._danger.next('documento supera el tamaño permitido');
            });
        }
    };
    PreinscripcionesDatosComponent = __decorate([
        Component({
            selector: 'app-preinscripciones-datos',
            templateUrl: './preinscripciones-datos.component.html',
            styleUrls: ['./preinscripciones-datos.component.css']
        }),
        __metadata("design:paramtypes", [AbcService, FormBuilder, ChangeDetectorRef])
    ], PreinscripcionesDatosComponent);
    return PreinscripcionesDatosComponent;
}());
export { PreinscripcionesDatosComponent };
//# sourceMappingURL=preinscripciones-datos.component.js.map