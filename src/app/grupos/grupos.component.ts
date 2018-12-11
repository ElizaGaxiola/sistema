import { Component,OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AbcService } from '../abc.service';
import { ActivatedRoute } from '@angular/router';
import { Grupo } from '../modelos';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements  OnInit {
  modulo:string="Grupos";
  idGrupo:number;
  grupo:Grupo;
  clave:string='';
  ciclo:string='';
  materia:string='';
  dtOptions: DataTables.Settings = {};
  //datos para datatable
  data: any[]=[];
  modal: string;
  tituloModal:string;
  constructor(private _route: ActivatedRoute,private abc: AbcService,private chRef: ChangeDetectorRef) { 
    console.log(this._route.snapshot.paramMap.get('id'));
    this.idGrupo = Number(this._route.snapshot.paramMap.get('id'));
    this.abc.getGrupo(this.idGrupo)
    .subscribe((data: any) => {
      console.log(data);
      this.grupo=data;
      this.clave=data.clave;
      this.abc.getCiclo(data.idCiclo).subscribe((ciclo:any)=>{
        this.ciclo=ciclo.descripcion;
        console.log(this.ciclo);
      });
      this.abc.getAsignatura(data.idMateria).subscribe((asignatura:any)=>{
        this.materia=asignatura.nombre;
        console.log(this.materia);
      });
    }); 
    this.obtenerAlumnos();
  }
  public obtenerAlumnos(){
    this.abc.getAlumnosxGrupo(this.idGrupo)
    .subscribe((data: any) => {
      console.log(data);
      console.log('data');
      this.data=data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('#table');
      table.DataTable();
    });
  }
  public calificar(){
    this.tituloModal= "Calificar Alumno";
    this.modal = "calificar";
    $("#modal").modal();
  }
  ngOnInit(): void {
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
        "search": "<i class='fas fa-search'></i>",
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
