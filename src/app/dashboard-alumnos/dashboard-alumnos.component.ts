import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-alumnos',
  templateUrl: './dashboard-alumnos.component.html',
  styleUrls: ['./dashboard-alumnos.component.css']
})
export class DashboardAlumnosComponent implements OnInit {
  public modulo: string = "Avisos"
  constructor() { }

  ngOnInit() {
  }

}
