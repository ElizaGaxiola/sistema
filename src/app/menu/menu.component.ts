import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { from } from 'rxjs';
import { Docente } from '../modelos';
import { AbcService } from '../abc.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  docente:Docente={
    idDocente:0,
    nombre:'',
    apellidoP:'',
    apellidoM:'',
    fechaNac:'',
    nss:'',
    telefono:'',
    titulo:'',
    curp:'',
    sexo:'',
    idMunicipio:0,
    colonia:'',
    calle:'',
    numero:'',
    cp:'',
    urlImagen:'',
    usuarioId:0,
    estatus:0,
    escuelaId:0,
    idUsuario:0,
    idTipo:0,
    usuario:'',
    contrasena:''
  };
  idUsuario:any;
  email:any;
  constructor(private auth: AuthService,private abc: AbcService) { }
  public salir(){
    this.auth.logout();
  }
  ngOnInit() {
    this.idUsuario=localStorage.getItem('idUsuario');
    this.abc.getDocente_Usuario(this.idUsuario).subscribe((data: any) => {
      this.docente=data;
      this.auth.getUserId(data.usuarioId)
    .subscribe((user: any) => {
      this.email = user.usuario;
    });
    });
  }

}
