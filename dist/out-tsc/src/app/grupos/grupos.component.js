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
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
var GruposComponent = /** @class */ (function () {
    function GruposComponent(pf, _route, abc, chRef) {
        var _this = this;
        this.pf = pf;
        this._route = _route;
        this.abc = abc;
        this.chRef = chRef;
        this.modulo = "Grupos";
        this.clave = '';
        this.ciclo = '';
        this.materia = '';
        this.cali = false;
        this.dtOptions = {};
        //datos para datatable
        this.data = [];
        this.select = [
            { id: 1, name: '1' },
            { id: 2, name: '2' },
            { id: 3, name: '3' },
            { id: 4, name: '4' },
            { id: 5, name: '5' },
            { id: 6, name: '6' },
            { id: 7, name: '7' },
            { id: 8, name: '8' },
            { id: 9, name: '9' },
            { id: 10, name: '10' }
        ];
        this.nombreAlu = '';
        this._success = new Subject();
        this._danger = new Subject();
        this.staticAlertClosed = false;
        console.log(this._route.snapshot.paramMap.get('id'));
        this.idGrupo = Number(this._route.snapshot.paramMap.get('id'));
        this.abc.getGrupo(this.idGrupo)
            .subscribe(function (data) {
            console.log(data);
            _this.grupo = data;
            _this.clave = data.clave;
            _this.abc.getActa(data.idSeccion, data.idPeriodo, data.idCarrera).subscribe(function (acta) {
                if (acta.status == false) {
                    _this.cali = false;
                }
                else {
                    _this.cali = true;
                    _this.acta = acta;
                    console.log(acta);
                }
                console.log(data);
                console.log(_this.cali);
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
        this.obtenerAlumnos();
    }
    GruposComponent.prototype.obtenerAlumnos = function () {
        var _this = this;
        this.abc.getAlumnosxGrupo(this.idGrupo)
            .subscribe(function (data) {
            console.log(data);
            console.log('data');
            _this.data = data;
            _this.chRef.detectChanges();
            // Now you can use jQuery DataTables :
            var table = $('table');
            table.DataTable();
        });
    };
    GruposComponent.prototype.calificar = function (idAlumno) {
        var _this = this;
        this.idAlumno = idAlumno;
        this.abc.getAlumno(idAlumno).subscribe(function (data) {
            console.log(data);
            _this.alumno = data;
            _this.nombreAlu = data.nombre + ' ' + data.apellidoP + ' ' + data.apellidoM;
        });
        $("#modal").modal();
    };
    GruposComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { return _this.staticAlertClosed = true; }, 20000);
        this._success.subscribe(function (message) { return _this.successMessage = message; });
        this._success.pipe(debounceTime(5000)).subscribe(function () { return _this.successMessage = null; });
        this._danger.subscribe(function (message) { return _this.dangerMessage = message; });
        this._danger.pipe(debounceTime(5000)).subscribe(function () { return _this.dangerMessage = null; });
        this.calificacionForm = this.pf.group({
            idConfCalificacion: [''],
            idAlumno: [''],
            calificacion: ['', [Validators.required]],
            idGrupo: ['']
        });
    };
    GruposComponent.prototype.saveCalificacion = function () {
        var saveCalificacion = {
            idConfCalificacion: this.acta.idConfCalificacion,
            idAlumno: this.idAlumno,
            calificacion: this.calificacionForm.get('calificacion').value,
            idGrupo: this.grupo.idGrupo
        };
        return saveCalificacion;
    };
    GruposComponent.prototype.onSubmit = function () {
        var _this = this;
        this.calificacion = this.saveCalificacion();
        console.log(this.calificacion);
        this.abc.insertCalificacion(this.calificacion).subscribe(function (res) {
            $("#modal").modal('hide');
            if (res.status == true) {
                _this._success.next(res.msg);
            }
        }, function (err) {
            console.log(err);
            _this._danger.next('A ocurrido un error intentalo de nuevo');
        });
    };
    GruposComponent = __decorate([
        Component({
            selector: 'app-grupos',
            templateUrl: './grupos.component.html',
            styleUrls: ['./grupos.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, ActivatedRoute, AbcService, ChangeDetectorRef])
    ], GruposComponent);
    return GruposComponent;
}());
export { GruposComponent };
//# sourceMappingURL=grupos.component.js.map