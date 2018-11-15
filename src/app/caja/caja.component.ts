import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit {
  modulo: string ='Caja';
  dtOptions: DataTables.Settings = {};
  //datos para datatable
  data: any[]=[
    { cantidad: "1", concepto:" Playera", precio:"$350"},
    { cantidad: "3", concepto:"Constancia", precio:"$10"},
    
  ];
  constructor() { }

  ngOnInit(): void {
    this.dtOptions = { 
      searching: false,
      paging: false,
      info: false,
      language: {
        "emptyTable": "No hay artículos",
        "info": " _START_ - _END_ / _TOTAL_ ",
        "infoEmpty": "0-0 /0",
        "infoFiltered": "",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "Mostrar _MENU_ registros",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "search": "Buscar:",
        "zeroRecords": "SNo hay artículos",
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
