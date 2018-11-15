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
    { matricula: "12344", apellidop:"Castro", apellidom:"Galaviz", nombre:"Evelyn Guadalupe",  calificacion:"10", faltas: "0"},
    { matricula: "12345", apellidop:"Chávez", apellidom:"Lizárraga", nombre:"Jesús Antonio",  calificacion:"10", faltas: "0"},
    { matricula: "12346", apellidop:"Gaxiola", apellidom:"Carrillo", nombre:"Elizabeth",  calificacion:"10", faltas: "0"},
    { matricula: "12347", apellidop:"Paredes", apellidom:"Lopez", nombre:"Julio Enrique",  calificacion:"10", faltas: "0"},
    { matricula: "12348", apellidop:"Valenzuela", apellidom:"Camacho", nombre:"Grace de Jesús",  calificacion:"10", faltas: "0"},
    { matricula: "12349", apellidop:"Vazquez", apellidom:"Niebla", nombre:"Kevin David", calificacion:"10"},
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
