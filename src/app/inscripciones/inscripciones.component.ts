import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css']
})
export class InscripcionesComponent implements OnInit {
  escuelaSelect: any[]=[];
  sexoSelect: any[]=[];
  municipioSelect: any[]=[];
  estadoSelect: any[]=[];
  cicloSelect: any[]=[];
  subcicloSelect: any[]=[];
  periodoSelect: any[]=[];
  grupoSelect: any[]=[];
  inscripcionForm: FormGroup;
  inscripcion: any;
  constructor(private pf: FormBuilder) { }

  ngOnInit() {
    this.inscripcionForm=this.pf.group({
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
      urlCertificado:['',[Validators.required]],
      idGrupo:['',[Validators.required]],
      idSubCiclo:['',[Validators.required]],
      idCiclo:['',[Validators.required]],
      idPeriodo:['',[Validators.required]],
      idEscuela:['',[Validators.required]],
    });
  }
  onSubmit(){
    this.inscripcion = this.saveInscripcion();
  }
  saveInscripcion(){
    const saveInscripcion={
      nombre: this.inscripcionForm.get('nombre').value,
      apellidoP: this.inscripcionForm.get('apellidoP').value,
      apellidoM: this.inscripcionForm.get('apellidoM').value,
      curp: this.inscripcionForm.get('curp').value,
      sexo: this.inscripcionForm.get('sexo').value,
      fechaNac: this.inscripcionForm.get('fechaNac').value,
      idMunicipio: this.inscripcionForm.get('idMunicipio').value,
      idEstado: this.inscripcionForm.get('idEstado').value,
      telefono: this.inscripcionForm.get('telefono').value,
      celular: this.inscripcionForm.get('celular').value,
      email: this.inscripcionForm.get('email').value,
      emailTutor: this.inscripcionForm.get('emailTutor').value,
      cp: this.inscripcionForm.get('cp').value,
      colonia: this.inscripcionForm.get('colonia').value,
      calle: this.inscripcionForm.get('calle').value,
      numero: this.inscripcionForm.get('numero').value,
      nombreTutor: this.inscripcionForm.get('nombreTutor').value,
      apellidoPTutor: this.inscripcionForm.get('apellidoPTutor').value,
      apellidoMTutor: this.inscripcionForm.get('apellidoMTutor').value,
      fechaNacTutor: this.inscripcionForm.get('fechaNacTutor').value,
      telefonoTutor: this.inscripcionForm.get('telefonoTutor').value,
      urlImagen: this.inscripcionForm.get('urlImagen').value,
      urlCertificado: this.inscripcionForm.get('urlCertificado').value,
      idEscuela: this.inscripcionForm.get('idEscuela').value,
      idGrupo: this.inscripcionForm.get('idGrupo').value,
      idCiclo: this.inscripcionForm.get('idCiclo').value,
      idSubCiclo: this.inscripcionForm.get('idSubCiclo').value,
      idPeriodo: this.inscripcionForm.get('idPeriodo').value,
    };
    return saveInscripcion;
  }


}
