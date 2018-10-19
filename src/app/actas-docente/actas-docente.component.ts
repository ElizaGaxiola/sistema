import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-actas-docente',
  templateUrl: './actas-docente.component.html',
  styleUrls: ['./actas-docente.component.css']
})
export class ActasDocenteComponent implements OnInit {
  modulo:string="Actas";
  constructor() { }
  //configuración para select
  config = {
    multiple:false,
    //value:la variable de modelo en la que desea guardar las opciones seleccionadas.
    displayKey:"description", 
    search:true 
  }
  dataModel:any[] = ['Matemáticas','Español','Hitoria']
  dtOptions: any = {};

  //datos para datatable
  data: any[]=[
    { numero: "1", apellidoP:"Acosta", apellidoM: "Rocha", nombre:"Jesús Carlos", cal:"10"},
    { numero: "2", apellidoP:"Castro", apellidoM: "Galaviz", nombre:"Evelyn Guadalupe", cal:"10"},
    { numero: "3", apellidoP:"Gaxiola", apellidoM: "Carrillo", nombre:"Elizabeth", cal:"10"},
  ];
  ngOnInit() {
    this.dtOptions = {
      "ordering": false,
      dom: 'Bfrtip',
      buttons: [
                'copy',
                {
                    extend: 'excel',
                    title: 'ACTA'
                },
                {
                    extend: 'pdf',
                    title: 'ACTA'
                },
                {
                    extend: 'print',
                    title: 'ACTA'
                }
            ],
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
        },
      }
    };
  }

}
