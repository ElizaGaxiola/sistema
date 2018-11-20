import { Component,OnDestroy, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-escuelas',
  templateUrl: './escuelas.component.html',
  styleUrls: ['./escuelas.component.css']
})
export class EscuelasComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  data: any[]=[
    { clave: "1", nombre:"Acosta", email: "Rocha", telefono:"Jesús Carlos"},
    
  ];
  modal: string;
  tituloModal:string;
  constructor() { 
  }
  public status(){
    this.tituloModal= "Status Escuela"
    this.modal = "status";
    $("#modal").modal();
  }
  public modificar(){
    this.tituloModal= "Modificar Escuela";
    this.modal = "modificar";
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
