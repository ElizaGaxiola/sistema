import { Component, OnInit } from '@angular/core';
import { AbcService } from '../abc.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-perfil-alumnos',
  templateUrl: './perfil-alumnos.component.html',
  styleUrls: ['./perfil-alumnos.component.css']
})
export class PerfilAlumnosComponent implements OnInit {
  modulo:string='Perfil';
  alumno:any={
    idAlumno:'',
    matricula:'',
    nombre:'',
    apellidoP:'',
    apellidoM:'',
    fechaNac:'',
    email:'',
    telefono:'',
    celular:'',
    curp:'',
    sexo:'',
    idMunicipio:'',
    colonia:'',
    calle:'',
    numero:'',
    cp:'',
    urlImagen:'',
    idUsuario:'',
    idEscuela:'',
    cardexDoc:'',
    actaNacDoc:'',
    comprobanteDoc:'',
    credencialDoc:''
  };
  idUsuario:any;
  municipio='';
  estado='';
  constructor(private abc: AbcService,private auth: AuthService) { }

  ngOnInit() {
    this.idUsuario=localStorage.getItem('idUsuario');
    this.abc.getAlumnoUsuario(this.idUsuario).subscribe((data: any) => {
      this.alumno=data;
      this.abc.getMunicipio(this.alumno.idMunicipio).subscribe((mun:any)=>{
        this.municipio=mun.nombre;
        this.abc.getEstado(mun.idEstado).subscribe((est:any)=>{
          this.estado=est.nombre;
        });
      });
      console.log(this.alumno);
    });
  }

}
