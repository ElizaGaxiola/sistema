var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import { ActivatedRoute } from '@angular/router';
import { AbcService } from '../abc.service';
var ReciboreinscripcionComponent = /** @class */ (function () {
    function ReciboreinscripcionComponent(_route, abc) {
        var _this = this;
        this._route = _route;
        this.abc = abc;
        this.ciclo = '';
        this.f = new Date();
        this.idAlumno = Number(this._route.snapshot.paramMap.get('idA'));
        this.idCiclo = Number(this._route.snapshot.paramMap.get('idCi'));
        this.idCarrera = Number(this._route.snapshot.paramMap.get('idCa'));
        this.abc.getAlumno(this.idAlumno).subscribe(function (data) {
            _this.obtenerRef(data);
            _this.nombreCan = data.nombre + ' ' + data.apellidoP + ' ' + data.apellidoM;
            _this.abc.getEscuela_Id(data.idEscuela).subscribe(function (escuela) {
                _this.nombreEsc = escuela.nombre;
            });
            _this.abc.getCarrera(_this.idCarrera).subscribe(function (carrera) {
                _this.nombreCar = carrera.descripcion;
                _this.importe = carrera.precio;
            });
        });
        this.abc.getCiclo(this.idCiclo).subscribe(function (data) {
            _this.ciclo = data.descripcion;
        });
    }
    ReciboreinscripcionComponent.prototype.obtenerRef = function (data) {
        var escuela = data.idEscuela.toString();
        if (Number(escuela) < 10) {
            escuela = '0' + escuela;
        }
        var carrera = this.idCarrera.toString();
        if (Number(carrera) < 10) {
            carrera = '0' + carrera;
        }
        var dd = this.f.getDate().toString();
        if (Number(dd) < 10) {
            dd = '0' + dd;
        }
        var mm = (this.f.getMonth() + 1).toString();
        if (Number(mm) < 10) {
            mm = '0' + mm;
        }
        this.ref = (escuela + carrera + dd + mm + this.f.getFullYear());
        for (var _i = 0; _i < 9; _i++) {
            this.ref = this.ref + Math.floor(Math.random() * 10);
        }
        console.log(this.ref);
    };
    ReciboreinscripcionComponent.prototype.downloadPDF = function () {
        var doc = new jsPDF();
        var specialElementHandlers = {
            '#editor': function (element, renderer) {
                return true;
            }
        };
        var content = this.content.nativeElement;
        doc.fromHTML(content.innerHTML, 15, 15, {
            'width': 190, specialElementHandlers: specialElementHandlers
        });
        doc.save('recibo.pdf');
    };
    __decorate([
        ViewChild('content'),
        __metadata("design:type", ElementRef)
    ], ReciboreinscripcionComponent.prototype, "content", void 0);
    ReciboreinscripcionComponent = __decorate([
        Component({
            selector: 'app-reciboreinscripcion',
            templateUrl: './reciboreinscripcion.component.html',
            styleUrls: ['./reciboreinscripcion.component.css']
        }),
        __metadata("design:paramtypes", [ActivatedRoute, AbcService])
    ], ReciboreinscripcionComponent);
    return ReciboreinscripcionComponent;
}());
export { ReciboreinscripcionComponent };
//# sourceMappingURL=reciboreinscripcion.component.js.map