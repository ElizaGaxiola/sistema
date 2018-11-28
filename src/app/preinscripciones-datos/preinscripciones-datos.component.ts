import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-preinscripciones-datos',
  templateUrl: './preinscripciones-datos.component.html',
  styleUrls: ['./preinscripciones-datos.component.css']
})
export class PreinscripcionesDatosComponent implements OnInit {
  escuelaSelect: any[]=[];
  sexoSelect: any[]=[];
  municipioSelect: any[]=[];
  estadoSelect: any[]=[];
  preinscripcionForm: FormGroup;
  preinscripcion: any;
  constructor(private pf: FormBuilder) { }

  ngOnInit() {
    this.preinscripcionForm=this.pf.group({
      nombre:['',[ Validators.required]],
      apellidoP:['', [Validators.required]], 
      apellidoM:['', [Validators.required]],
      curp:['',[Validators.required]],
      sexo:['',[Validators.required]],
      fechaNac:['',[Validators.required]],
      idMunicipio:['',[Validators.required]],
      telefonoTutor:['',[Validators.required]],
      //idEstado:['',[Validators.required]],
      //telefono:['',[Validators.required]],
      celular:['',[Validators.required]],
      email:['',[Validators.required, Validators.email]],
      colonia:['',[ Validators.required]],
      cp:['',[ Validators.required]],
      calle:['',[ Validators.required]],
      numero:['',[ Validators.required]],
      nombreTutor:['',[ Validators.required]],
      apellidoPTutor:['', [Validators.required]], 
      apellidoMTutor:['', [Validators.required]],
      fechaNacTutor:['',[Validators.required]],
      emailTutor:['',[Validators.required, Validators.email]],
      urlImagen:['',[Validators.required]],
      urlActa:['',[Validators.required]],
      urlConstancia:['',[Validators.required]],
      urlCredencial:['',[Validators.required]],
      urlComprobante:['',[Validators.required]],
      idEscuela:['',[Validators.required]],
    });
  }
  onSubmit(){
    this.preinscripcion = this.savePreinscripcion();
  }
  savePreinscripcion(){
    const savePreinscripcion={
      nombre: this.preinscripcionForm.get('nombre').value,
      apellidoP: this.preinscripcionForm.get('apellidoP').value,
      apellidoM: this.preinscripcionForm.get('apellidoM').value,
      curp: this.preinscripcionForm.get('curp').value,
      sexo: this.preinscripcionForm.get('sexo').value,
      fechaNac: this.preinscripcionForm.get('fechaNac').value,
      idMunicipio: this.preinscripcionForm.get('idMunicipio').value,
      idEstado: this.preinscripcionForm.get('idEstado').value,
      telefono: this.preinscripcionForm.get('telefono').value,
      celular: this.preinscripcionForm.get('celular').value,
      email: this.preinscripcionForm.get('email').value,
      emailTutor: this.preinscripcionForm.get('emailTutor').value,
      cp: this.preinscripcionForm.get('cp').value,
      colonia: this.preinscripcionForm.get('colonia').value,
      calle: this.preinscripcionForm.get('calle').value,
      numero: this.preinscripcionForm.get('numero').value,
      nombreTutor: this.preinscripcionForm.get('nombreTutor').value,
      apellidoPTutor: this.preinscripcionForm.get('apellidoPTutor').value,
      apellidoMTutor: this.preinscripcionForm.get('apellidoMTutor').value,
      fechaNacTutor: this.preinscripcionForm.get('fechaNacTutor').value,
      telefonoTutor: this.preinscripcionForm.get('telefonoTutor').value,
      urlImagen: this.preinscripcionForm.get('urlImagen').value,
      urlActa: this.preinscripcionForm.get('urlActa').value,
      urlConstancia: this.preinscripcionForm.get('urlConstancia').value,
      urlCredencial: this.preinscripcionForm.get('urlCredencial').value,
      urlComprobante: this.preinscripcionForm.get('urlComprobante').value,
      idEscuela: this.preinscripcionForm.get('idEscuela').value,
    };
    return savePreinscripcion;
  }

}
