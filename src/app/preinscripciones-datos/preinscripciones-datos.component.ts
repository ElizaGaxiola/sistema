import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preinscripciones-datos',
  templateUrl: './preinscripciones-datos.component.html',
  styleUrls: ['./preinscripciones-datos.component.css']
})
export class PreinscripcionesDatosComponent implements OnInit {
  //configuración para select
  config = {
    multiple:false,
    //value:la variable de modelo en la que desea guardar las opciones seleccionadas.
    displayKey:"description", 
    search:true 
  }
  dataModel:any[] = ['101','102','103']
  
  constructor() { }

  ngOnInit() {
  }

}
