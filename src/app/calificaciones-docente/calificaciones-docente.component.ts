import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Administrador } from '../modelos';
import { AbcService } from '../abc.service';

@Component({
  selector: 'app-calificaciones-docente',
  templateUrl: './calificaciones-docente.component.html',
  styleUrls: ['./calificaciones-docente.component.css']
})
export class CalificacionesDocenteComponent implements OnInit {
  public modulo: string = "Calificaciones"
  grupos: any[]=[];
  idGrupo:number;
  idUsuario: any;
  dtOptions: any;
  materia:string='';
  cali:boolean=false;
  acta:any;
  //datos para datatable
  data: any[]=[];
  calif:number=0;
  promedio:number=0;
  promedioAcu:number=0;
  totAlumnos:number=0;
  constructor(private abc:AbcService,private chRef: ChangeDetectorRef) {
    
   }

  public change(){
    this.data=[];
    this.promedioAcu=0;
    this.totAlumnos=0;
    if(this.idGrupo){
      this.abc.getGrupo(this.idGrupo).subscribe((data:any)=>{
        this.abc.getAsignatura(data.idMateria).subscribe((asignatura:any)=>{
          this.materia=asignatura.nombre;
          console.log(this.materia);
          this.abc.getActa(data.idSeccion,data.idPeriodo,data.idCarrera).subscribe((acta:any)=>{
            if(acta.status == false){
              this.cali=false;
            }else{
              this.acta=acta;
              this.abc.getAlumnosxGrupo(this.idGrupo)
              .subscribe((data: any) => {
                for (let alumno of data) {
                  this.totAlumnos =this.totAlumnos+1;
                  this.abc.getCalificacion(this.acta.idConfCalificacion,this.idGrupo,alumno.idAlumno).subscribe((calif:any)=>{
                    console.log(calif);
                    this.calif=Number(calif.calificacion);
                    this.promedioAcu=this.promedioAcu+this.calif;
                    this.prom();
                    this.data = [...this.data, { matricula: alumno.matricula, apellidop:alumno.apellidoP, apellidom:alumno.apellidoM, nombre:alumno.nombre,  calificacion:this.calif}];
                  });
                  }
                this.chRef.detectChanges();
                // Now you can use jQuery DataTables :
                const table: any = $('table');
                table.DataTable();
              });
            }
          });
        });
      });
    }else{
      this.materia='';
    }    
  }
  public prom(){
    
    console.log('promedio');
    console.log(this.totAlumnos);
    console.log(this.promedioAcu);
    this.promedio=this.promedioAcu/this.totAlumnos;
  }
  ngOnInit(): void {
    this.idUsuario=localStorage.getItem('idUsuario');
    this.abc.getDocente_Usuario(this.idUsuario).subscribe((user: any) => {
      this.abc.getDocenete(user.idDocente).subscribe((data: any) => {
        console.log(data);
        this.abc.getGruposDocente(data.idDocente).subscribe((grupos:any)=>{
          for (let grupo of grupos) {
            this.grupos = [...this.grupos, {id: grupo.idGrupo, name: grupo.clave}];
          }
        });
    });
  });
  this.dtOptions = {  
    "ordering": false,
    dom: 'Bfrtip',
    buttons: [
              'copy',
              {
                  extend: 'excel',
                  title: 'ACTA'
              },
              {
                  extend: 'pdf',
                  title: 'ACTA'
              },
              {
                  extend: 'print',
                  title: 'ACTA'
              }
          ],
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
      "search": "<i class='fas fa-search'></i>",
      "zeroRecords": "Sin resultados encontrados",
      "paginate": {
          "first": "Primero",
          "last": "Ultimo",
          "next": "Siguiente",
          "previous": "Anterior"
      },
    }
  };
  }

}
