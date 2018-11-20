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
  dtOptions: DataTables.Settings = {};
  data: any[]=[
    { descripcion: " se encuentra", edificio:"1"},
    
  ];
  constructor() { }

  public agregar(){
 
    $("#modal-agregar").modal();
  }
  public modificar(){
    
    $("#modal-modificar").modal();
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
