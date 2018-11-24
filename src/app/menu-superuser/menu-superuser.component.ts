import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { from } from 'rxjs';
import { AbcService } from '../abc.service';
import { Administrador } from '../modelos';
@Component({
  selector: 'app-menu-superuser',
  templateUrl: './menu-superuser.component.html',
  styleUrls: ['./menu-superuser.component.css']
})
export class MenuSuperuserComponent implements OnInit {
  idUsuario: any;
  administrador:Administrador={
    idAdministrador:0,
    nombre:'',
    apellidoP:'',
    apellidoM:'',
    email:'',
    contrasena:'',
    idUsuario:0,
    idEscuela:0,
    estatus:0,
    imagen:''
  };

  constructor(private auth: AuthService, private abc:AbcService) { }

  public salir(){
    this.auth.logout();
  }

  ngOnInit() {
    this.idUsuario=localStorage.getItem('idUsuario');
    this.abc.getAdministrador_Usuario(this.idUsuario).subscribe((data: any) => {
      this.administrador=data;
    });
  }

}
