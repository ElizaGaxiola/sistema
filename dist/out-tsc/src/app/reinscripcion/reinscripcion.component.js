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
import { AbcService } from '../abc.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
var ReinscripcionComponent = /** @class */ (function () {
    function ReinscripcionComponent(pf, abc) {
        this.pf = pf;
        this.abc = abc;
        this.escuelaSelect = [];
        this.sexoSelect = [
            { id: 1, name: 'Masculino' },
            { id: 2, name: 'Femenino' },
            { id: 3, name: 'Indefinido' }
        ];
        this.municipiosSelect = [];
        this.estadosSelect = [];
        this.cicloSelect = [];
        this.subcicloSelect = [];
        this.periodoSelect = [];
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
        this.loader = false;
        this._success = new Subject();
        this._danger = new Subject();
        this.staticAlertClosed = false;
        this.urlImagen = 'profile.png';
    }
    ReinscripcionComponent.prototype.change = function () {
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
    ReinscripcionComponent.prototype.changeCiclo = function () {
        var _this = this;
        console.log(this.idCiclo);
        this.subcicloSelect = [];
        this.inscripcionForm.get('idSubCiclo').reset();
        this.abc.getSubCiclos_Ciclos(this.idCiclo).subscribe(function (data) {
            for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                var subCiclo = data_2[_i];
                _this.subcicloSelect = _this.subcicloSelect.concat([{ id: subCiclo.idSubCiclo, name: subCiclo.descripcion }]);
            }
        });
    };
    ReinscripcionComponent.prototype.buscar = function (event) {
        var _this = this;
        if (event.keyCode == 13) {
            this.abc.getAlumnoMat(this.matricula).subscribe(function (data) {
                if (data.status == false) {
                    _this._danger.next(data.msg);
                }
                else {
                    console.log(data);
                    _this.periodoSelect = [];
                    _this.urlImagen = data.urlImagen;
                    _this.abc.getPeriodos(data.idEscuela).subscribe(function (esc) {
                        for (var _i = 0, esc_1 = esc; _i < esc_1.length; _i++) {
                            var item = esc_1[_i];
                            _this.id = { idSeccion: item.idSeccion, idPeriodo: item.idPeriodo, idCarrera: item.idCarrera };
                            _this.periodoSelect = _this.periodoSelect.concat([{ id: _this.id, name: item.descripcion }]);
                        }
                    });
                    _this.abc.getMunicipio(data.idMunicipio).subscribe(function (mun) {
                        _this.idEstado = mun.idEstado;
                        _this.change();
                        console.log(mun);
                    });
                    _this.abc.getTutorAlumno(data.idAlumno).subscribe(function (tutor) {
                        console.log(tutor);
                        _this.inscripcionForm = _this.pf.group({
                            nombre: data.nombre,
                            apellidoP: data.apellidoP,
                            apellidoM: data.apellidoM,
                            curp: data.curp,
                            sexo: Number(data.sexo),
                            fechaNac: data.fechaNac,
                            idMunicipio: data.idMunicipio,
                            celular: data.celular,
                            telefono: data.telefono,
                            email: data.email,
                            colonia: data.colonia,
                            cp: data.cp,
                            calle: data.calle,
                            numero: data.numero,
                            urlImagen: data.urlImagen,
                            idEscuela: data.idEscuela,
                            nombreTutor: tutor.nombre,
                            apellidoPTutor: tutor.apellidoP,
                            apellidoMTutor: tutor.apellidoM,
                            fechaNacTutor: tutor.fechaNac,
                            emailTutor: tutor.email,
                            telefonoTutor: tutor.celular,
                            idSubCiclo: [],
                            idCiclo: [],
                            idPeriodo: [],
                            idSeccion: [],
                            idCarrera: [],
                            cardexDoc: data.cardexDoc,
                            actaNacDoc: data.actaNacDoc,
                            comprobanteDoc: data.comprobanteDoc,
                            credencialDoc: data.credencialDoc,
                            matricula: data.matricula,
                            idTutor: tutor.idTutor,
                            idAlumno: data.idAlumno
                        });
                    });
                }
            });
        }
    };
    ReinscripcionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.abc.getEstados().subscribe(function (data) {
            for (var _i = 0, data_3 = data; _i < data_3.length; _i++) {
                var estado = data_3[_i];
                _this.estadosSelect = _this.estadosSelect.concat([{ id: estado.idEstado, name: estado.nombre }]);
            }
        });
        this.idUsuario = localStorage.getItem('idUsuario');
        this.abc.getAdministrador_Usuario(this.idUsuario).subscribe(function (data) {
            _this.administradorUser = data;
            _this.abc.getCiclos(data.idEscuela).subscribe(function (ciclos) {
                for (var _i = 0, ciclos_1 = ciclos; _i < ciclos_1.length; _i++) {
                    var ciclo = ciclos_1[_i];
                    _this.cicloSelect = _this.cicloSelect.concat([{ id: ciclo.idCiclo, name: ciclo.descripcion }]);
                }
            });
            _this.abc.getEscuela_Id(data.idEscuela).subscribe(function (escuela) {
                _this.escuela = escuela.nombre;
            });
            _this.abc.getPeriodos(data.idEscuela).subscribe(function (data) {
                for (var _i = 0, data_4 = data; _i < data_4.length; _i++) {
                    var item = data_4[_i];
                    _this.id = { idSeccion: item.idSeccion, idPeriodo: item.idPeriodo, idCarrera: item.idCarrera };
                    _this.periodoSelect = _this.periodoSelect.concat([{ id: _this.id, name: item.descripcion }]);
                }
            });
        });
        setTimeout(function () { return _this.staticAlertClosed = true; }, 20000);
        this._success.subscribe(function (message) { return _this.successMessage = message; });
        this._success.pipe(debounceTime(5000)).subscribe(function () { return _this.successMessage = null; });
        this._danger.subscribe(function (message) { return _this.dangerMessage = message; });
        this._danger.pipe(debounceTime(5000)).subscribe(function () { return _this.dangerMessage = null; });
        this.inscripcionForm = this.pf.group({
            matricula: ['', [Validators.required]],
            nombre: ['', [Validators.required]],
            apellidoP: ['', [Validators.required]],
            apellidoM: ['', [Validators.required]],
            curp: ['', [Validators.required]],
            sexo: ['', [Validators.required]],
            fechaNac: ['', [Validators.required]],
            idMunicipio: ['', [Validators.required]],
            telefonoTutor: ['', [Validators.required]],
            telefono: [''],
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
            urlImagen: [''],
            idSubCiclo: ['', [Validators.required]],
            idCiclo: ['', [Validators.required]],
            idPeriodo: ['', [Validators.required]],
            idSeccion: [''],
            idCarrera: [''],
            idEscuela: [''],
            cardexDoc: [''],
            actaNacDoc: [''],
            comprobanteDoc: [''],
            credencialDoc: [''],
            idTutor: [''],
            idAlumno: ['']
        });
    };
    ReinscripcionComponent.prototype.onSubmit = function () {
        var _this = this;
        this.reinscripcion = this.saveReinscripcion();
        console.log(this.reinscripcion);
        this.abc.reinsertIscripcion(this.reinscripcion).subscribe(function (resp) {
            _this.loader = false;
            if (resp.status) {
                _this.inscripcionForm.reset();
            }
            else {
                _this._danger.next('A ocurrido un error, por favor vuelve a intentarlo');
            }
        }, function (error) {
            _this.loader = false;
            _this._danger.next(' error vuelva a intentarlo ');
        });
    };
    ReinscripcionComponent.prototype.saveReinscripcion = function () {
        var saveReinscripcion = {
            nombre: this.inscripcionForm.get('nombre').value,
            apellidoP: this.inscripcionForm.get('apellidoP').value,
            apellidoM: this.inscripcionForm.get('apellidoM').value,
            curp: this.inscripcionForm.get('curp').value,
            sexo: this.inscripcionForm.get('sexo').value,
            fechaNac: this.inscripcionForm.get('fechaNac').value,
            idMunicipio: this.inscripcionForm.get('idMunicipio').value,
            telefono: this.inscripcionForm.get('telefono').value,
            celular: this.inscripcionForm.get('celular').value,
            email: this.inscripcionForm.get('email').value,
            emailTutor: this.inscripcionForm.get('emailTutor').value,
            cp: this.inscripcionForm.get('cp').value,
            colonia: this.inscripcionForm.get('colonia').value,
            calle: this.inscripcionForm.get('calle').value,
            numero: this.inscripcionForm.get('numero').value,
            nombreTutor: this.inscripcionForm.get('nombreTutor').value,
            apellidoPTutor: this.inscripcionForm.get('apellidoPTutor').value,
            apellidoMTutor: this.inscripcionForm.get('apellidoMTutor').value,
            fechaNacTutor: this.inscripcionForm.get('fechaNacTutor').value,
            telefonoTutor: this.inscripcionForm.get('telefonoTutor').value,
            urlImagen: this.urlImagen,
            idEscuela: this.administradorUser.idEscuela,
            idCiclo: this.inscripcionForm.get('idCiclo').value,
            idSubCiclo: this.inscripcionForm.get('idSubCiclo').value,
            idPeriodo: this.id.idPeriodo,
            idSeccion: this.id.idSeccion,
            idCarrera: this.id.idCarrera,
            cardexDoc: this.inscripcionForm.get('cardexDoc').value,
            actaNacDoc: this.inscripcionForm.get('actaNacDoc').value,
            comprobanteDoc: this.inscripcionForm.get('comprobanteDoc').value,
            credencialDoc: this.inscripcionForm.get('credencialDoc').value,
            matricula: this.inscripcionForm.get('matricula').value,
            idTutor: this.inscripcionForm.get('idTutor').value,
            idAlumno: this.inscripcionForm.get('idAlumno').value,
        };
        return saveReinscripcion;
    };
    ReinscripcionComponent.prototype.cargandoImagen = function (e) {
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
    ReinscripcionComponent = __decorate([
        Component({
            selector: 'app-reinscripcion',
            templateUrl: './reinscripcion.component.html',
            styleUrls: ['./reinscripcion.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, AbcService])
    ], ReinscripcionComponent);
    return ReinscripcionComponent;
}());
export { ReinscripcionComponent };
//# sourceMappingURL=reinscripcion.component.js.map