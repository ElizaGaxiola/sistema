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
var ReciboComponent = /** @class */ (function () {
    function ReciboComponent(_route, abc) {
        var _this = this;
        this._route = _route;
        this.abc = abc;
        this.f = new Date();
        console.log(this._route.snapshot.paramMap.get('id'));
        this.idCandidato = Number(this._route.snapshot.paramMap.get('id'));
        this.abc.getCandidato(this.idCandidato).subscribe(function (data) {
            _this.obtenerRef(data);
            _this.nombreCan = data.nombre + ' ' + data.apellidoP + ' ' + data.apellidoM;
            _this.abc.getEscuela_Id(data.idEscuela).subscribe(function (escuela) {
                _this.nombreEsc = escuela.nombre;
            });
            _this.abc.getCarrera(data.idCarrera).subscribe(function (carrera) {
                _this.nombreCar = carrera.descripcion;
                _this.importe = carrera.precio;
            });
        });
    }
    ReciboComponent.prototype.obtenerRef = function (data) {
        var escuela = data.idEscuela.toString();
        if (escuela < 10) {
            escuela = '0' + escuela;
        }
        var carrera = data.idCarrera.toString();
        if (carrera < 10) {
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
    ReciboComponent.prototype.downloadPDF = function () {
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
    ], ReciboComponent.prototype, "content", void 0);
    ReciboComponent = __decorate([
        Component({
            selector: 'app-recibo',
            templateUrl: './recibo.component.html',
            styleUrls: ['./recibo.component.css']
        }),
        __metadata("design:paramtypes", [ActivatedRoute, AbcService])
    ], ReciboComponent);
    return ReciboComponent;
}());
export { ReciboComponent };
//# sourceMappingURL=recibo.component.js.map