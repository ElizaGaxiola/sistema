import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbcService } from '../abc.service';
import { DocenteService } from '../docente.service';

@Component({
  selector: 'app-calificaciones-alumnos',
  templateUrl: './calificaciones-alumnos.component.html',
  styleUrls: ['./calificaciones-alumnos.component.css']
})
export class CalificacionesAlumnosComponent implements OnInit {
  public modulo: string = "Calificaciones"
  promedio:number=0;
  cont:number;
  dtOptions: DataTables.Settings = {};
  //datos para datatable
  data: any[]=[];
  idUsuario:any;
  idCiclo:number;
  idSubciclo:number;
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
  cicloSelect: any[]=[];
  subcicloSelect: any[]=[];
  constructor(private pf: FormBuilder,private abc: AbcService) { }
  public changeCiclo(){
    console.log(this.idCiclo);
    this.subcicloSelect=[]; 
    this.abc.getSubCiclos_Ciclos(this.idCiclo).subscribe((data:any) => {
      for (let subCiclo of data) {
        this.subcicloSelect = [...this.subcicloSelect, {id: subCiclo.idSubCiclo, name: subCiclo.descripcion}];
      }
    });
  }

  public changeSub(){
    this.promedio=0;
    this.cont=0;
    this.data=[];
    this.abc.getCalificacionesAlumno(this.alumno.idAlumno,this.idCiclo,this.idSubciclo).subscribe((data:any)=>{
      console.log(data);
      for (let d of data) {
        console.log(d);
        this.abc.getAsignatura(d.idMateria).subscribe((mat:any)=>{
          this.abc.getDocenete(d.idDocente).subscribe((doc:any)=>{
            let cal:number;
            cal = Number(d.calificacion)/Number(d.cont);
            this.promedio=this.promedio+cal;
            this.cont++;
            this.data = [...this.data, {materia: mat.nombre, docente: doc.nombre+' '+doc.apellidoP, calificacion:cal}];
            this.promedio=this.promedio/this.cont;
            console.log(this.data);
          });
        });
      }
    });
  }

  ngOnInit(): void {
    this.idUsuario=localStorage.getItem('idUsuario');
    this.abc.getAlumnoUsuario(this.idUsuario).subscribe((data: any) => {
      this.alumno=data;
      console.log(this.alumno);
      this.abc.getCiclos(data.idEscuela).subscribe((ciclos: any) => {
        for (let ciclo of ciclos) {
          this.cicloSelect = [...this.cicloSelect, {id: ciclo.idCiclo, name: ciclo.descripcion}];
        }
      });
    });
    this.dtOptions = {
      language: {
        "emptyTable": "Sin resultados encontrados",
        "info": " _START_ - _END_ / _TOTAL_ ",
        "infoEmpty": "0-0 /0",
        "infoFiltered": "",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "Mostrar _MENU_ registros",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "search": "Buscar:",
        "zeroRecords": "Sin resultados encontrados",
        "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "Siguiente",
            "previous": "Anterior"
        }
      }
    };
  }

}
