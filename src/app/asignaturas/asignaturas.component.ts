import { Component,OnDestroy, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.css']
})
export class AsignaturasComponent implements OnInit {
  modulo:string='Asignaturas';
  dtOptions: DataTables.Settings = {};
  data: any[]=[
    { nombre: "1", creditos:"Acosta"},
    
  ];
  constructor() { }
  public agregar(){
 
    $("#modal-agregar").modal();
  }
  public modificar(){
    
    $("#modal-modificar").modal();
  }
  public asignar(){
    
    $("#modal-asignar").modal();
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
