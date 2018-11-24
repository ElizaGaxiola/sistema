import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css']
})
export class InscripcionesComponent implements OnInit {

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
      //sexo:['',[Validators.required]],
      //municipio:['',[Validators.required]],
      localidad:['',[Validators.required]],
      lada:['',[Validators.required]],
      telfijo:['',[Validators.required]],
      lada2:['',[Validators.required]],
      telcel:['',[Validators.required]],
      correo:['',[Validators.required, Validators.email]],
      correo2:['',[Validators.required, Validators.email]],
      fecha:['',[Validators.required]],
      colonia:['',[ Validators.required]],
      codpos:['',[ Validators.required]],
      calle:['',[ Validators.required]],
      numero:['',[ Validators.required]],
      nombre1:['',[ Validators.required]],
      apellidop1:['', [Validators.required]], 
      apellidom1:['', [Validators.required]],
      fecha2:['',[Validators.required]],
      ocupacion:['',[Validators.required]],
      suimagen:['',[Validators.required]],
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
      fecha: this.preinscripcionForm.get('fecha').value,
      //sexo: this.preinscripcionForm.get('sexo').value,
      municipio: this.preinscripcionForm.get('municipio').value,
      localidad: this.preinscripcionForm.get('localidad').value,
      lada: this.preinscripcionForm.get('lada').value,
      telfijo: this.preinscripcionForm.get('telfijo').value,
      lada2: this.preinscripcionForm.get('lada2').value,
      telcel: this.preinscripcionForm.get('telcel').value,
      correo: this.preinscripcionForm.get('correo').value,
      correo2: this.preinscripcionForm.get('correo2').value,
      codpos: this.preinscripcionForm.get('codpos').value,
      colonia: this.preinscripcionForm.get('colonia').value,
      calle: this.preinscripcionForm.get('calle').value,
      numero: this.preinscripcionForm.get('numero').value,
      nombre1: this.preinscripcionForm.get('nombre1').value,
      apellidop1: this.preinscripcionForm.get('apellidop1').value,
      apellidom1: this.preinscripcionForm.get('apellidom1').value,
      fecha2: this.preinscripcionForm.get('fecha').value,
      ocupacion: this.preinscripcionForm.get('ocupacion').value,
      suimagen: this.preinscripcionForm.get('suimagen').value,
    };
    return savePreinscripcion;
  }


}
