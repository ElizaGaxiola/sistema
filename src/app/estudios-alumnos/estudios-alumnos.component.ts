import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estudios-alumnos',
  templateUrl: './estudios-alumnos.component.html',
  styleUrls: ['./estudios-alumnos.component.css']
})
export class EstudiosAlumnosComponent implements OnInit {
  public modulo: string = "Estudios"
  constructor() { }

  ngOnInit() {
  }

}
