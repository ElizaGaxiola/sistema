import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { from } from 'rxjs';
import { AuthService } from '../auth.service';
import { AbcService } from '../abc.service';

@Component({
  selector: 'app-menu-alum',
  templateUrl: './menu-alum.component.html',
  styleUrls: ['./menu-alum.component.css']
})
export class MenuAlumComponent implements OnInit {
  sesion:any;
  alumno:any={
    idAlumno:[''],
    matricula:[''],
    nombre:[''],
    apellidoP:[''],
    apellidoM:[''],
    fechaNac:[''],
    email:[''],
    telefono:[''],
    celular:[''],
    curp:[''],
    sexo:[''],
    idMunicipio:[''],
    colonia:[''],
    calle:[''],
    numero:[''],
    cp:[''],
    urlImagen:[''],
    idUsuario:[''],
    idEscuela:[''],
    cardexDoc:[''],
    actaNacDoc:[''],
    comprobanteDoc:[''],
    credencialDoc:''
  };
  idUsuario: any;
  constructor(private auth: AuthService,private abc:AbcService) {
    
   }

  public salir(){
    this.auth.logout();
  }
  
  ngOnInit() {
    this.idUsuario=localStorage.getItem('idUsuario');
    this.abc.getAlumnoUsuario(this.idUsuario).subscribe((data: any) => {
      this.alumno=data;
      console.log(this.alumno);
    });
  }

}
