import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-docente',
  templateUrl: './dashboard-docente.component.html',
  styleUrls: ['./dashboard-docente.component.css']
})
export class DashboardDocenteComponent implements OnInit {
   modulo: string ='Dashboard';
  constructor() { }

  ngOnInit() {
  }

}
