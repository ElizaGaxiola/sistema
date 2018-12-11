import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-alumnos',
  templateUrl: './perfil-alumnos.component.html',
  styleUrls: ['./perfil-alumnos.component.css']
})
export class PerfilAlumnosComponent implements OnInit {
  modulo:string='Perfil';
  
  idUsuario:any;
  constructor() { }

  ngOnInit() {
  }

}
