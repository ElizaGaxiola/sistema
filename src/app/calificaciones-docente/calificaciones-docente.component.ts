import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calificaciones-docente',
  templateUrl: './calificaciones-docente.component.html',
  styleUrls: ['./calificaciones-docente.component.css']
})
export class CalificacionesDocenteComponent implements OnInit {
  public modulo: string = "Calificaciones"
  //configuración para select
  config = {
    multiple:false,
    //value:la variable de modelo en la que desea guardar las opciones seleccionadas.
    displayKey:"description", 
    search:true 
  }
  dataModel:any[] = ['101','102','103']
  dataModel2:any[] = ['Español','Matemáticas','Biología']
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