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
var CajaComponent = /** @class */ (function () {
    function CajaComponent(pf) {
        this.pf = pf;
        this.modulo = 'Caja';
        this.dtOptions = {};
        //datos para datatable
        this.data = [
            { cantidad: "1", concepto: "Playera", precio: "120.50" },
            { cantidad: "2", concepto: "Constancias", precio: "10.50" },
        ];
    }
    CajaComponent.prototype.ngOnInit = function () {
        this.cajaForm = this.pf.group({
            idUsuario: ['', [Validators.required]],
            idAlumno: ['', [Validators.required]],
            fecha: ['', [Validators.required]],
            total: ['', [Validators.required]],
        });
    };
    CajaComponent.prototype.onSubmit = function () {
        this.caja = this.saveVenta();
    };
    CajaComponent.prototype.agregar = function () {
        $("#modal").modal();
    };
    CajaComponent.prototype.saveVenta = function () {
        var saveVenta = {
            idUsuario: this.cajaForm.get('idUsuario').value,
            idAlumno: this.cajaForm.get('idAlumno').value,
            fecha: this.cajaForm.get('fecha').value,
            total: this.cajaForm.get('total').value,
        };
        return saveVenta;
    };
    CajaComponent = __decorate([
        Component({
            selector: 'app-caja',
            templateUrl: './caja.component.html',
            styleUrls: ['./caja.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder])
    ], CajaComponent);
    return CajaComponent;
}());
export { CajaComponent };
//# sourceMappingURL=caja.component.js.map