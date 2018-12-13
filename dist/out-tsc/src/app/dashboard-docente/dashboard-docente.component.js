var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
var DashboardDocenteComponent = /** @class */ (function () {
    function DashboardDocenteComponent() {
        this.modulo = 'Dashboard';
    }
    DashboardDocenteComponent.prototype.ngOnInit = function () {
        this.calendarOptions = {
            editable: true,
            eventLimit: false,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listMonth'
            }
        };
    };
    __decorate([
        ViewChild(CalendarComponent),
        __metadata("design:type", CalendarComponent)
    ], DashboardDocenteComponent.prototype, "ucCalendar", void 0);
    DashboardDocenteComponent = __decorate([
        Component({
            selector: 'app-dashboard-docente',
            templateUrl: './dashboard-docente.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], DashboardDocenteComponent);
    return DashboardDocenteComponent;
}());
export { DashboardDocenteComponent };
//# sourceMappingURL=dashboard-docente.component.js.map