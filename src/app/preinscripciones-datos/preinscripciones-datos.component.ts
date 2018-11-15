import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-preinscripciones-datos',
  templateUrl: './preinscripciones-datos.component.html',
  styleUrls: ['./preinscripciones-datos.component.css']
})
export class PreinscripcionesDatosComponent implements OnInit {
  preinscripcionForm: FormGroup; 
  //configuración para select
  config = {
    multiple:false,
    //value:la variable de modelo en la que desea guardar las opciones seleccionadas.
    displayKey:"description", 
    search:true 
  }
  dataModel:any[] = ['Femenino','Masculino']
  dataModel2:any[]=[
    'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Ciudad de México',
    'Coahuila', 'Colima', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'México', 'Michoacán', 'Morelos',
    'Nayarit', 'Nuevo León','Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora',
    'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
  ]
  dataModel3:any[] = ['Preescolar','Primaria', 'Secundaria', 'Bachillerato', 'Licenciatura', 'Maestria', 'Doctorado']
  
  constructor(private pf: FormBuilder) { }
  ngOnInit() {
    this.preinscripcionForm=this.pf.group({
      nombre:['', Validators.required], 
     
    });
  }

}
