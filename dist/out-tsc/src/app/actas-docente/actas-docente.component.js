var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbcService } from '../abc.service';
var ActasDocenteComponent = /** @class */ (function () {
    function ActasDocenteComponent(_route, abc, chRef) {
        this._route = _route;
        this.abc = abc;
        this.chRef = chRef;
        this.modulo = "Actas";
        this.clave = '';
        this.ciclo = '';
        this.materia = '';
        //datos para datatable
        this.data = [];
    }
    ActasDocenteComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this._route.snapshot.paramMap.get('id'));
        this.idGrupo = Number(this._route.snapshot.paramMap.get('id'));
        this.abc.getGrupo(this.idGrupo)
            .subscribe(function (data) {
            console.log(data);
            _this.grupo = data;
            _this.clave = data.clave;
            _this.abc.getActa(data.idSeccion, data.idPeriodo, data.idCarrera).subscribe(function (acta) {
                if (acta.status == false) {
                    //no hay para mostrar
                }
                else {
                    _this.acta = acta;
                    _this.dtOptions = {
                        "Sort": false,
                        "ajax": {
                            url: 'http://localhost:8080/Apis/public/api/alumnosGCalificacion?idGrupo=' + _this.idGrupo + '&idConfCalificacion=' + _this.acta.idConfCalificacion,
                            type: 'GET'
                        },
                        columns: [
                            {
                                title: 'Matricula',
                                data: 'matricula'
                            },
                            {
                                title: 'Apellido Paterno',
                                data: 'apellidoP'
                            },
                            {
                                title: 'Apellido Materno',
                                data: 'apellidoM'
                            },
                            {
                                title: 'Nombre',
                                data: 'nombre'
                            },
                            {
                                title: 'Calificación',
                                data: 'calificacion'
                            }
                        ],
                        "ordering": false,
                        dom: 'Bfrtip',
                        buttons: [
                            'copy',
                            {
                                extend: 'excel',
                                title: 'ACTA'
                            },
                            {
                                extend: 'pdf',
                                title: 'ACTA'
                            },
                            {
                                extend: 'print',
                                title: 'ACTA'
                            }
                        ],
                        language: {
                            "emptyTable": "Sin resultados encontrados",
                            "info": " _START_ - _END_ / _TOTAL_ ",
                            "infoEmpty": "0-0 /0",
                            "infoFiltered": "",
                            "infoPostFix": "",
                            "thousands": ",",
                            "lengthMenu": "Mostrar _MENU_ registros",
                            "loadingRecords": "Cargando...",
                            "processing": "Procesando...",
                            "search": "<i class='fas fa-search'></i>",
                            "zeroRecords": "Sin resultados encontrados",
                            "paginate": {
                                "first": "Primero",
                                "last": "Ultimo",
                                "next": "Siguiente",
                                "previous": "Anterior"
                            },
                        }
                    };
                    _this.dataTable = $(_this.table.nativeElement);
                    _this.dataTable.DataTable(_this.dtOptions);
                }
            });
            _this.abc.getCiclo(data.idCiclo).subscribe(function (ciclo) {
                _this.ciclo = ciclo.descripcion;
                console.log(_this.ciclo);
            });
            _this.abc.getAsignatura(data.idMateria).subscribe(function (asignatura) {
                _this.materia = asignatura.nombre;
                console.log(_this.materia);
            });
        });
    };
    __decorate([
        ViewChild('dataTable'),
        __metadata("design:type", Object)
    ], ActasDocenteComponent.prototype, "table", void 0);
    ActasDocenteComponent = __decorate([
        Component({
            selector: 'app-actas-docente',
            templateUrl: './actas-docente.component.html',
            styleUrls: ['./actas-docente.component.css']
        }),
        __metadata("design:paramtypes", [ActivatedRoute, AbcService, ChangeDetectorRef])
    ], ActasDocenteComponent);
    return ActasDocenteComponent;
}());
export { ActasDocenteComponent };
//# sourceMappingURL=actas-docente.component.js.map