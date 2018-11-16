import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
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
  preinscripcionForm: FormGroup;
  preinscripcion: any;
  constructor(private pf: FormBuilder) { }

  ngOnInit() {
    this.preinscripcionForm=this.pf.group({
      nombre:['',[ Validators.required]],
      apellidop:['', [Validators.required]], 
      apellidom:['', [Validators.required]],
      curp:['',[Validators.required]],
      sexo:['',[Validators.required]],
      municipio:['',[Validators.required]],
      localidad:['',[Validators.required]],
     // correo:['',[Validators.required]]
    });
  }
  onSubmit(){
    this.preinscripcion = this.savePreinscripcion();
  }
  savePreinscripcion(){
    const savePreinscripcion={
      nombre: this.preinscripcionForm.get('nombre').value,
      apellidop: this.preinscripcionForm.get('apellidop').value,
      apellidom: this.preinscripcionForm.get('apellidom').value,
      curp: this.preinscripcionForm.get('curp').value,
      sexo: this.preinscripcionForm.get('sexo').value,
      municipio: this.preinscripcionForm.get('municipio').value,
      localidad: this.preinscripcionForm.get('localidad').value,
      //correo: this.preinscripcionForm.get('correo').value
    };
    return savePreinscripcion;
  }

}
