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
var DashboardAlumnosComponent = /** @class */ (function () {
    function DashboardAlumnosComponent(abc, chRef) {
        this.abc = abc;
        this.chRef = chRef;
        this.modulo = "Avisos";
    }
    DashboardAlumnosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.idUsuario = localStorage.getItem('idUsuario');
        this.abc.getAlumnoUsuario(this.idUsuario).subscribe(function (data) {
            _this.abc.getAvisosAct(data.idEscuela).subscribe(function (avisos) {
                console.log(avisos);
                _this.datos = avisos;
            });
        });
    };
    DashboardAlumnosComponent = __decorate([
        Component({
            selector: 'app-dashboard-alumnos',
            templateUrl: './dashboard-alumnos.component.html',
            styleUrls: ['./dashboard-alumnos.component.css']
        }),
        __metadata("design:paramtypes", [AbcService, ChangeDetectorRef])
    ], DashboardAlumnosComponent);
    return DashboardAlumnosComponent;
}());
export { DashboardAlumnosComponent };
//# sourceMappingURL=dashboard-alumnos.component.js.map