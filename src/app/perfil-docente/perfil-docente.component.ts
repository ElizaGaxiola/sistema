import { Component, OnInit } from '@angular/core';
import { Docente } from '../modelos';
import { AbcService } from '../abc.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-perfil-docente',
  templateUrl: './perfil-docente.component.html',
  styleUrls: ['./perfil-docente.component.css']
})
export class PerfilDocenteComponent implements OnInit {
  modulo:string='Perfil';
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
  constructor(private abc: AbcService,private auth: AuthService) { }

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
