import { Component,OnDestroy, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-aulas',
  templateUrl: './aulas.component.html',
  styleUrls: ['./aulas.component.css']
})
export class AulasComponent implements OnInit {
  modulo:string='Aulas';
  modal:string;
     //configuración para select
 config = {
  multiple:false,
  //value:la variable de modelo en la que desea guardar las opciones seleccionadas.
  displayKey:"description", 
  search:true 
}
dataModel:any[] = ['101','102','103']
  dtOptions: DataTables.Settings = {};
  data: any[]=[
    { descripcion: " se encuentra", edificio:"1"},
    
  ];
  constructor() { }
  
  public agregar(){
    this.modal = 'agregar';
    $("#modal").modal();
  }
  public modificar(){
    this.modal = 'modificar';
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
