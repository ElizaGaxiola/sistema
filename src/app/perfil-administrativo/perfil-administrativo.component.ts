import { Component, OnInit } from '@angular/core';
import { AbcService } from '../abc.service';
import { Administrador } from '../modelos';


@Component({
  selector: 'app-perfil-administrativo',
  templateUrl: './perfil-administrativo.component.html',
  styleUrls: ['./perfil-administrativo.component.css']
})
export class PerfilAdministrativoComponent implements OnInit {
  modulo:string='Perfil';
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
  idUsuario:any;
  constructor(private abc: AbcService) { }

  ngOnInit() {
    this.idUsuario=localStorage.getItem('idUsuario');
    this.abc.getAdministrador_Usuario(this.idUsuario).subscribe((data: any) => {
      this.administrador=data;
    });
  }

}
