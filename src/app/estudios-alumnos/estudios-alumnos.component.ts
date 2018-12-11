import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AbcService } from '../abc.service';
import { Administrador, Escuela } from '../modelos';


@Component({
  selector: 'app-estudios-alumnos',
  templateUrl: './estudios-alumnos.component.html',
  styleUrls: ['./estudios-alumnos.component.css']
})
export class EstudiosAlumnosComponent implements OnInit {
  public modulo: string = "Estudios"
  estudiosForm: FormGroup;
  estudios: any;
  escuela: Escuela;
  idUsuario: any;
  municipio:any;
  seccion:any;
  estado: any;
  administradorUser:Administrador={
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
  constructor(private pf: FormBuilder, private abc: AbcService) { }
 
  
  ngOnInit() {
    this.inicializarForm();
    this.idUsuario=localStorage.getItem('idUsuario');
    this.abc.getAlumnoUsuario(this.idUsuario).subscribe((data: any) => {
      console.log(data);
      this.abc.getEscuela_Id(data.idEscuela).subscribe((escuela: any)=>{
       console.log(escuela);
       this.abc.getSeccion(escuela.idSeccion).subscribe((sec: any) => {
        console.log(sec);
        this.seccion=sec;
        this.abc.getMunicipio(escuela.idMunicipio).subscribe((mun: any) => {
        console.log(mun);
        this.municipio=mun;
        this.abc.getEstado(mun.idEstado).subscribe((est: any) => {
        console.log(est);
        this.estado=est;
        this.escuela=escuela;
        this.estudiosForm=this.pf.group({
         idEscuela: escuela.idEscuela,
         idSeccion: this.seccion.descripcion,
         clave: escuela.clave,
         nombre: escuela.nombre,
         idMunicipio: this.municipio.nombre,
         idEstado: est.nombre,
         colonia: escuela.colonia,
         calle: escuela.calle,
         cp: escuela.cp,
         numero: escuela.numero,
         email:escuela.email,
         telefono: escuela.telefono,
         estatus: escuela.estatus
       });
       console.log(this.estudiosForm)
      });
      });
      });
      });
    });
    
  }
public inicializarForm(){
    this.estudiosForm = this.pf.group({
      idEscuela: [''],
      idSeccion: [''],
      clave: [''],
      nombre: [''],
      idEstado:[''],
      idMunicipio: [''],
      colonia:[''],
      calle: [''],
      cp: [''],
      numero: [''],
      email:[''],
      telefono: [''],
      estatus: [''],
    });
   }
  
}
