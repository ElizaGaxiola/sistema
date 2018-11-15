import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modificar-perfil-alumno',
  templateUrl: './modificar-perfil-alumno.component.html',
  styleUrls: ['./modificar-perfil-alumno.component.css']
})
export class ModificarPerfilAlumnoComponent implements OnInit {
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
