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
import { AbcService } from '../abc.service';
var HorarioAlumnosComponent = /** @class */ (function () {
    function HorarioAlumnosComponent(abc) {
        this.abc = abc;
        this.modulo = "Horario";
        this.dtOptions = {};
        this.tabla = [];
        this.dia = '';
        this.materia = '';
        this.aula = '';
        this.edificio = '';
    }
    HorarioAlumnosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.idUsuario = localStorage.getItem('idUsuario');
        this.abc.getAlumnoUsuario(this.idUsuario).subscribe(function (data) {
            _this.abc.getGruposAlumno(data.idAlumno).subscribe(function (alum) {
                console.log(alum);
                var _loop_1 = function (grupo) {
                    console.log(grupo);
                    _this.abc.getHorarios(grupo.idGrupo).subscribe(function (grup) {
                        console.log(grup);
                        var _loop_2 = function (g) {
                            if (g.diaSemana == 1) {
                                _this.dia = 'Domingo';
                            }
                            else if (g.diaSemana == 2) {
                                _this.dia = 'Lunes';
                            }
                            else if (g.diaSemana == 3) {
                                _this.dia = 'Martes';
                            }
                            else if (g.diaSemana == 4) {
                                _this.dia = 'Miércoles';
                            }
                            else if (g.diaSemana == 5) {
                                _this.dia = 'Jueves';
                            }
                            else if (g.diaSemana == 6) {
                                _this.dia = 'Viernes';
                            }
                            else if (g.diaSemana == 7) {
                                _this.dia = 'Sábado';
                            }
                            _this.abc.getGrupo(grupo.idGrupo).subscribe(function (grupoCom) {
                                _this.abc.getAsignatura(grupoCom.idMateria).subscribe(function (mat) {
                                    _this.materia = mat.nombre;
                                    _this.abc.getAula(g.idAula).subscribe(function (a) {
                                        _this.aula = a.descripcion;
                                        _this.abc.getEdificio(a.idEdificio).subscribe(function (e) {
                                            _this.edificio = e.descripcion;
                                            _this.tabla = _this.tabla.concat([{ dia: _this.dia, materia: _this.materia, horario: g.horaIni + '-' + g.horaFin, edificio: _this.edificio, aula: _this.aula }]);
                                            console.log(_this.tabla);
                                        });
                                    });
                                });
                            });
                        };
                        for (var _i = 0, grup_1 = grup; _i < grup_1.length; _i++) {
                            var g = grup_1[_i];
                            _loop_2(g);
                        }
                    });
                };
                for (var _i = 0, alum_1 = alum; _i < alum_1.length; _i++) {
                    var grupo = alum_1[_i];
                    _loop_1(grupo);
                }
            });
        });
    };
    HorarioAlumnosComponent = __decorate([
        Component({
            selector: 'app-horario-alumnos',
            templateUrl: './horario-alumnos.component.html',
            styleUrls: ['./horario-alumnos.component.css']
        }),
        __metadata("design:paramtypes", [AbcService])
    ], HorarioAlumnosComponent);
    return HorarioAlumnosComponent;
}());
export { HorarioAlumnosComponent };
//# sourceMappingURL=horario-alumnos.component.js.map