import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adeudos-alumnos',
  templateUrl: './adeudos-alumnos.component.html',
  styleUrls: ['./adeudos-alumnos.component.css']
})
export class AdeudosAlumnosComponent implements OnInit {

  public modulo: string = "Adeudos"
  
  dtOptions: DataTables.Settings = {};
  //datos para datatable
  data: any[]=[
    { concepto: "Inscripción", cantidad:"$600", fechalim: "10-10-2018"},
    { concepto: "Playera", cantidad:"$100", fechalim: "10-10-2018"},
  ];
  constructor() { }

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
