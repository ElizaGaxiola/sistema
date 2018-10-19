import { Component, OnInit, ViewChild  } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
@Component({
  selector: 'app-dashboard-docente',
  templateUrl: './dashboard-docente.component.html',
})
export class DashboardDocenteComponent implements OnInit {
   modulo: string ='Dashboard';
   calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor() { }

  ngOnInit() {
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      }
    };    
  }

}
