import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-estudios-alumnos',
  templateUrl: './estudios-alumnos.component.html',
  styleUrls: ['./estudios-alumnos.component.css']
})
export class EstudiosAlumnosComponent implements OnInit {
  public modulo: string = "Estudios"
  estudiosForm: FormGroup;
  estudios: any;
  constructor(private pf: FormBuilder) { }
  onSubmit(){
    this.estudios = this.saveEstudios();
  }
  
  ngOnInit() {
    this.estudiosForm=this.pf.group({
      nombre:[''],
      clave:[''],
      idSeccion:[''],
      idMunicipio:[''],
      telefono:[''],
      idEstado:[''],
      email:[''],
      colonia:[''],
      cp:[''],
      calle:[''],
    });
  }

  saveEstudios(){
    const saveEstudios={
      nombre: this.estudiosForm.get('nombre').value,
      clave: this.estudiosForm.get('clave').value,
      idSeccion: this.estudiosForm.get('idSeccion').value,
      idMunicipio: this.estudiosForm.get('idMunicipio').value,
      idEstado: this.estudiosForm.get('idEstado').value,
      telefono: this.estudiosForm.get('telefono').value,
      email: this.estudiosForm.get('email').value,
      cp: this.estudiosForm.get('cp').value,
      colonia: this.estudiosForm.get('colonia').value,
      calle: this.estudiosForm.get('calle').value,
     
      
    };
    return saveEstudios;
  }
}
