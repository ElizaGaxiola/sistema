import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horario-alumnos',
  templateUrl: './horario-alumnos.component.html',
  styleUrls: ['./horario-alumnos.component.css']
})
export class HorarioAlumnosComponent implements OnInit {
  public modulo: string = "Horario"
  dtOptions: DataTables.Settings = {};
  constructor() { }

  ngOnInit() {
  }

}
