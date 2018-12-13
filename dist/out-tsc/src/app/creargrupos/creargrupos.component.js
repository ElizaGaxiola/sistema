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
var CreargruposComponent = /** @class */ (function () {
    function CreargruposComponent(abc, pf, chRef) {
        this.abc = abc;
        this.pf = pf;
        this.chRef = chRef;
        this.modulo = 'Grupos';
        this.cicloSelect = [];
        this.docenteSelect = [];
        this.asignaturaSelect = [];
        this.periodoSelect = [];
        this.subcicloSelect = [];
        this.aulaSelect = [];
        this.edificioSelect = [];
        this.diaSelect = [
            { id: 1, name: 'Domingo' },
            { id: 2, name: 'Lunes' },
            { id: 3, name: 'Martes' },
            { id: 4, name: 'Miércoles' },
            { id: 5, name: 'Jueves' },
            { id: 6, name: 'Viernes' },
            { id: 7, name: 'Sábado' },
        ];
        this.data = [];
        this.horarios = [];
        this.idHorario = 0;
        this._success = new Subject();
        this._danger = new Subject();
        this.staticAlertClosed = false;
    }
    CreargruposComponent.prototype.agregar = function () {
        this.inicializarForm();
        this.modal = "agregar";
        $("#modal").modal();
    };
    CreargruposComponent.prototype.eliminar = function (idHorario) {
        var _this = this;
        this.abc.deleteHorario(idHorario).subscribe(function (RES) {
            _this._success.next('Datos eliminados con éxito');
            _this.obtenerHorarios(_this.idGrupo);
        }, function (err) {
            console.log(err);
            _this._danger.next('A ocurrido un error intentalo de nuevo');
        });
    };
    CreargruposComponent.prototype.obtenerHorarios = function (idGrupo) {
        var _this = this;
        this.idGrupo = idGrupo;
        this.horarios = [];
        this.abc.getHorarios(idGrupo)
            .subscribe(function (data) {
            _this.chRef.detectChanges();
            var _loop_1 = function (item) {
                switch (item.diaSemana) {
                    case "1": {
                        _this.dia = "Domingo";
                        break;
                    }
                    case "2": {
                        _this.dia = "Lunes";
                        break;
                    }
                    case "3": {
                        _this.dia = "Martes";
                        break;
                    }
                    case "4": {
                        _this.dia = "Miércoles";
                        break;
                    }
                    case "5": {
                        _this.dia = "Jueves";
                        break;
                    }
                    case "6": {
                        _this.dia = "Viernes";
                        break;
                    }
                    case "7": {
                        _this.dia = "Sábado";
                        break;
                    }
                    default: {
                        break;
                    }
                }
                _this.abc.getAula(item.idAula).subscribe(function (aula) {
                    _this.abc.getEdificio(aula.idEdificio).subscribe(function (edificio) {
                        _this.horarios.push({ dia: _this.dia, edificio: edificio.descripcion, aula: aula.descripcion, horaIni: item.horaIni, horaFin: item.horaFin, idHorario: item.idHorario });
                    });
                });
            };
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var item = data_1[_i];
                _loop_1(item);
            }
            console.log(_this.horarios);
            // Now you can use jQuery DataTables :
            var table = $('#table_horario');
            table.DataTable();
        });
    };
    CreargruposComponent.prototype.agregarHorario = function (idGrupo) {
        this.idGrupo = idGrupo;
        this.obtenerHorarios(idGrupo);
        this.inicializarForm();
        this.modal = "horario";
        $("#modal-horario").modal();
    };
    CreargruposComponent.prototype.agregarDetalleHorario = function () {
        $("#modal-horario").modal('hide');
        this.modal = "agregar-horario";
        $("#modal-detalle-horario").modal();
    };
    CreargruposComponent.prototype.modificar = function (idGrupo) {
        var _this = this;
        this.abc.getGrupo(idGrupo)
            .subscribe(function (data) {
            console.log(data);
            _this.idCiclo = data.idCiclo;
            _this.id = { idSeccion: data.idSeccion, idPeriodo: data.idPeriodo, idCarrera: data.idCarrera };
            _this.periodo = _this.id;
            _this.changeCiclo();
            _this.changePeriodo();
            _this.grupoForm = _this.pf.group({
                idGrupo: data.idGrupo,
                clave: data.clave,
                idCiclo: data.idCiclo,
                idSubCiclo: data.idSubCiclo,
                idSeccion: data.idSeccion,
                idPeriodo: data.idPeriodo,
                idCarrera: data.idCarrera,
                idMateria: data.idMateria,
                idDocente: data.idDocente,
                idGrupoAnt: data.idGrupoAnt,
                idEscuela: data.idEscuela,
            });
            _this.modal = 'modificar';
            $("#modal").modal();
        });
    };
    CreargruposComponent.prototype.modificarHorario = function (idHorario) {
        var _this = this;
        this.idHorario = idHorario;
        this.abc.getHorario(idHorario).subscribe(function (data) {
            _this.abc.getAula(data.idAula).subscribe(function (aula) {
                _this.idEdificio = aula.idEdificio;
                _this.idGrupo = data.idGrupo;
                _this.change();
                _this.chRef.detectChanges();
                _this.horarioForm = _this.pf.group({
                    idHorario: data.idHorario,
                    idGrupo: data.idGrupo,
                    diaSemana: Number(data.diaSemana),
                    idAula: data.idAula,
                    horaIni: data.horaIni,
                    horaFin: data.horaFin
                });
            });
        });
        $("#modal-horario").modal('hide');
        this.modal = 'modificar-horario';
        $("#modal-detalle-horario").modal();
    };
    CreargruposComponent.prototype.clonar = function (idGrupo) {
        var _this = this;
        this.abc.getGrupo(idGrupo)
            .subscribe(function (data) {
            _this.id = { idSeccion: data.idSeccion, idPeriodo: data.idPeriodo, idCarrera: data.idCarrera };
            _this.periodo = _this.id;
            _this.grupo = _this.saveGrupo();
            _this.grupo.clave = data.clave;
            _this.grupo.idCiclo = data.idCiclo;
            _this.grupo.idSubCiclo = data.idSubCiclo;
            _this.grupo.idSeccion = data.idSeccion;
            _this.grupo.idPeriodo = data.idPeriodo;
            _this.grupo.idCarrera = data.idCarrera;
            _this.grupo.idMateria = data.idMateria;
            _this.grupo.idDocente = data.idDocente;
            _this.grupo.idGrupoAnt = data.idGrupo;
            _this.grupo.idEscuela = data.idEscuela;
            _this.abc.insertGrupo(_this.grupo).subscribe(function (res) {
                _this._success.next('Datos modificados con éxito');
                _this.obtenerGruposTable();
            }, function (err) {
                console.log(err);
                _this._danger.next('A ocurrido un error intentalo de nuevo');
            });
        });
    };
    CreargruposComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.modal == 'modificar') {
            this.grupo = this.saveGrupo();
            this.abc.updateGrupo(this.grupo).subscribe(function (res) {
                $("#modal").modal('hide');
                _this._success.next('Datos actualizados con éxito');
            }, function (err) {
                console.log(err);
                _this._danger.next('A ocurrido un error intentalo de nuevo');
            });
            this.obtenerGruposTable();
        }
        else if (this.modal == 'agregar') {
            this.grupo = this.saveGrupo();
            this.abc.insertGrupo(this.grupo).subscribe(function (res) {
                $("#modal").modal('hide');
                _this._success.next('Datos agregados con éxito');
            }, function (err) {
                console.log(err);
                _this._danger.next('A ocurrido un error intentalo de nuevo');
            });
            this.obtenerGruposTable();
        }
        else if (this.modal == 'agregar-horario') {
            this.horario = this.saveHorario();
            console.log(this.horario);
            this.abc.insertHorario(this.horario).subscribe(function (data) {
                console.log(data);
                if (data.status == false) {
                    _this._danger.next(data.msg);
                }
                else {
                    $("#modal-detalle-horario").modal('hide');
                    _this._success.next('Datos agregados con éxito');
                    _this.agregarHorario(_this.idGrupo);
                }
            }, function (err) {
                console.log(err);
                _this._danger.next('A ocurrido un error intentalo de nuevo');
            });
        }
        else if (this.modal == 'modificar-horario') {
            this.horario = this.saveHorario();
            console.log('HORARIO');
            console.log(this.horario);
            this.abc.updateHorario(this.horario).subscribe(function (data) {
                console.log(data);
                if (data.status == false) {
                    _this._danger.next(data.msg);
                }
                else {
                    $("#modal-detalle-horario").modal('hide');
                    _this._success.next('Datos agregados con éxito');
                    _this.agregarHorario(_this.idGrupo);
                }
            }, function (err) {
                console.log(err);
                _this._danger.next('A ocurrido un error intentalo de nuevo');
            });
        }
    };
    CreargruposComponent.prototype.changePeriodo = function () {
        var _this = this;
        this.asignaturaSelect = [];
        this.grupoForm.get('idMateria').reset();
        this.abc.getAsignaturasPeriodo(this.periodo.idSeccion, this.periodo.idPeriodo, this.periodo.idCarrera)
            .subscribe(function (data) {
            for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                var asignatura = data_2[_i];
                _this.asignaturaSelect = _this.asignaturaSelect.concat([{ id: asignatura.idMateria, name: asignatura.nombre }]);
            }
        });
    };
    CreargruposComponent.prototype.changeCiclo = function () {
        var _this = this;
        this.subcicloSelect = [];
        this.grupoForm.get('idSubCiclo').reset();
        this.abc.getSubCiclos_Ciclos(this.idCiclo).subscribe(function (data) {
            for (var _i = 0, data_3 = data; _i < data_3.length; _i++) {
                var subCiclo = data_3[_i];
                _this.subcicloSelect = _this.subcicloSelect.concat([{ id: subCiclo.idSubCiclo, name: subCiclo.descripcion }]);
            }
        });
    };
    CreargruposComponent.prototype.inicializarForm = function () {
        this.grupoForm = this.pf.group({
            idGrupo: [''],
            clave: ['', [Validators.required]],
            idCiclo: ['', [Validators.required]],
            idSubCiclo: ['', [Validators.required]],
            idSeccion: [''],
            idPeriodo: [''],
            idCarrera: [''],
            idMateria: ['', [Validators.required]],
            idDocente: ['', [Validators.required]],
            idGrupoAnt: [0],
            idEscuela: [''],
        });
        this.horarioForm = this.pf.group({
            idHorario: [''],
            idGrupo: [''],
            diaSemana: ['', [Validators.required]],
            idAula: ['', [Validators.required]],
            horaIni: ['', [Validators.required]],
            horaFin: ['', [Validators.required]]
        });
    };
    CreargruposComponent.prototype.saveGrupo = function () {
        var saveGrupo = {
            idGrupo: this.grupoForm.get('idGrupo').value,
            clave: this.grupoForm.get('clave').value,
            idCiclo: this.grupoForm.get('idCiclo').value,
            idSubCiclo: this.grupoForm.get('idSubCiclo').value,
            idSeccion: this.periodo.idSeccion,
            idPeriodo: this.periodo.idPeriodo,
            idCarrera: this.periodo.idCarrera,
            idMateria: this.grupoForm.get('idMateria').value,
            idDocente: this.grupoForm.get('idDocente').value,
            idGrupoAnt: this.grupoForm.get('idGrupoAnt').value,
            idEscuela: this.administradorUser.idEscuela,
        };
        return saveGrupo;
    };
    CreargruposComponent.prototype.saveHorario = function () {
        var saveHorario = {
            idHorario: this.idHorario,
            idGrupo: this.idGrupo,
            diaSemana: this.horarioForm.get('diaSemana').value,
            idAula: this.horarioForm.get('idAula').value,
            horaIni: this.horarioForm.get('horaIni').value,
            horaFin: this.horarioForm.get('horaFin').value,
        };
        return saveHorario;
    };
    CreargruposComponent.prototype.change = function () {
        var _this = this;
        this.abc.getAulasxEdificio(this.idEdificio).subscribe(function (data) {
            _this.aulaSelect = [];
            if (data != null) {
                for (var _i = 0, data_4 = data; _i < data_4.length; _i++) {
                    var aula = data_4[_i];
                    _this.aulaSelect = _this.aulaSelect.concat([{ id: aula.idAula, name: aula.descripcion }]);
                }
            }
        });
    };
    CreargruposComponent.prototype.cerrarDetalle = function () {
        this.agregarHorario(this.idGrupo);
    };
    CreargruposComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.idUsuario = localStorage.getItem('idUsuario');
        this.abc.getAdministrador_Usuario(this.idUsuario).subscribe(function (data) {
            _this.administradorUser = data;
            _this.obtenerGruposTable();
            _this.abc.getCiclos(_this.administradorUser.idEscuela).subscribe(function (data) {
                for (var _i = 0, data_5 = data; _i < data_5.length; _i++) {
                    var ciclo = data_5[_i];
                    _this.cicloSelect = _this.cicloSelect.concat([{ id: ciclo.idCiclo, name: ciclo.descripcion }]);
                }
            });
            _this.abc.getDocenetes(_this.administradorUser.idEscuela).subscribe(function (data) {
                for (var _i = 0, data_6 = data; _i < data_6.length; _i++) {
                    var docente = data_6[_i];
                    _this.docenteSelect = _this.docenteSelect.concat([{ id: docente.idDocente, name: docente.nombre + ' ' + docente.apellidoP + ' ' + docente.apellidoM }]);
                }
            });
            _this.abc.getPeriodos(_this.administradorUser.idEscuela).subscribe(function (data) {
                for (var _i = 0, data_7 = data; _i < data_7.length; _i++) {
                    var item = data_7[_i];
                    _this.id = { idSeccion: item.idSeccion, idPeriodo: item.idPeriodo, idCarrera: item.idCarrera };
                    _this.periodoSelect = _this.periodoSelect.concat([{ id: _this.id, name: item.descripcion }]);
                }
            });
            _this.abc.getEdificios(_this.administradorUser.idEscuela).subscribe(function (data2) {
                console.log(data2);
                if (data2 != null) {
                    for (var _i = 0, data2_1 = data2; _i < data2_1.length; _i++) {
                        var edificio = data2_1[_i];
                        _this.edificioSelect = _this.edificioSelect.concat([{ id: edificio.idEdificio, name: edificio.descripcion }]);
                    }
                }
            });
        });
        setTimeout(function () { return _this.staticAlertClosed = true; }, 20000);
        this._success.subscribe(function (message) { return _this.successMessage = message; });
        this._success.pipe(debounceTime(5000)).subscribe(function () { return _this.successMessage = null; });
        this._danger.subscribe(function (message) { return _this.dangerMessage = message; });
        this._danger.pipe(debounceTime(5000)).subscribe(function () { return _this.dangerMessage = null; });
        this.inicializarForm();
    };
    CreargruposComponent.prototype.obtenerGruposTable = function () {
        var _this = this;
        this.abc.getGruposTable(this.administradorUser.idEscuela)
            .subscribe(function (data) {
            _this.data = data;
            _this.chRef.detectChanges();
            // Now you can use jQuery DataTables :
            var table = $('#table');
            table.DataTable();
        });
    };
    CreargruposComponent = __decorate([
        Component({
            selector: 'app-creargrupos',
            templateUrl: './creargrupos.component.html',
            styleUrls: ['./creargrupos.component.css']
        }),
        __metadata("design:paramtypes", [AbcService, FormBuilder, ChangeDetectorRef])
    ], CreargruposComponent);
    return CreargruposComponent;
}());
export { CreargruposComponent };
//# sourceMappingURL=creargrupos.component.js.map