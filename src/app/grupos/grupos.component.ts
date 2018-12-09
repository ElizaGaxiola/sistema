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
  //configuración para select
  config = {
    multiple:false,
    //value:la variable de modelo en la que desea guardar las opciones seleccionadas.
    displayKey:"description", 
    search:true 
  }
  dataModel:any[] = ['Matemáticas','Español','Hitoria']
  dtOptions: DataTables.Settings = {};
  //datos para datatable
  data: any[]=[
    { numero: "1", apellidoP:"Acosta", apellidoM: "Rocha", nombre:"Jesús Carlos"},
    { numero: "2", apellidoP:"Castro", apellidoM: "Galaviz", nombre:"Evelyn Guadalupe"},
    { numero: "3", apellidoP:"Gaxiola", apellidoM: "Carrillo", nombre:"Elizabeth"},
  ];
  modal: string;
  tituloModal:string;
  constructor() { 
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
