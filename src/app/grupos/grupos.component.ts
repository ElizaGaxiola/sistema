import { Component,OnDestroy, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements  OnInit {
  modulo:string="Grupos";
  dtOptions: DataTables.Settings = {};
  data: any[]=[
    { numero: "1", apellidoP:"Acosta", apellidoM: "Rocha", nombre:"Jesús Carlos", acciones:"<button type='button' class='btn btn-warning' title='Calificar'><i class='fas fa-chalkboard-teacher'></i></button><button type='button' class='btn btn-danger' title='Faltas'><i class='fas fa-calendar-times'></i></button>"},
    { numero: "2", apellidoP:"Castro", apellidoM: "Galaviz", nombre:"Evelyn Guadalupe", acciones:"<button type='button' class='btn btn-warning' title='Calificar'><i class='fas fa-chalkboard-teacher'></i></button><button type='button' class='btn btn-danger' title='Faltas'><i class='fas fa-calendar-times'></i></button>"},
    { numero: "3", apellidoP:"Gaxiola", apellidoM: "Carrillo", nombre:"Elizabeth", acciones:"<button type='button' class='btn btn-warning' title='Calificar'><i class='fas fa-chalkboard-teacher'></i></button><button type='button' class='btn btn-danger' title='Faltas'><i class='fas fa-calendar-times'></i></button>"},
  ];
  constructor() { 
  }
  public faltas(){
    alert('faltas');
    $("#calificar").modal();
  }
  public calificar(){
    alert('calificar');
    $("#calificar").modal();
  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
     
    };
  }
}
