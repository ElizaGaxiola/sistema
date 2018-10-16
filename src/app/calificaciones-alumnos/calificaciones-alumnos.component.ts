import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calificaciones-alumnos',
  templateUrl: './calificaciones-alumnos.component.html',
  styleUrls: ['./calificaciones-alumnos.component.css']
})
export class CalificacionesAlumnosComponent implements OnInit {
  public modulo: string = "Calificaciones"
  //configuración para select
  config = {
    multiple:false,
    //value:la variable de modelo en la que desea guardar las opciones seleccionadas.
    displayKey:"description", 
    search:true 
  }
  dataModel:any[] = ['1er Grado','2do Grado','3er Grado']
  dtOptions: DataTables.Settings = {};
  //datos para datatable
  data: any[]=[
    { materia: "Español", calificacion:"10", faltas: "0"},
    { materia: "Matemáticas", calificacion:"10", faltas: "0"},
    { materia: "Biología", calificacion:"10", faltas: "0"},
    { materia: "Historia", calificacion:"10", faltas: "0"},
    { materia: "Química", calificacion:"10", faltas: "0"},
    { materia: "Física", calificacion:"10", faltas: "0"},
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
