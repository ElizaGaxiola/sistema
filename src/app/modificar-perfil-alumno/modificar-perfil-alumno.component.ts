import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';


@Component({
  selector: 'app-modificar-perfil-alumno',
  templateUrl: './modificar-perfil-alumno.component.html',
  styleUrls: ['./modificar-perfil-alumno.component.css']
})
export class ModificarPerfilAlumnoComponent implements OnInit {
  modulo:string='Modificar Perfil';

modalumnoForm: FormGroup;
modalumno: any;
constructor(private pf: FormBuilder) { }

  ngOnInit() {
    this.modalumnoForm=this.pf.group({
      apellidoP:[''],
      nombre:[''],
      apellidoM:[''],
      email:[''],
      telefono:[''],
      celular:[''],
      idDom:[''],
      idMunicipio:[''],
      idEstado:[''],
      fechaNac:[''],
      nss:[''],
      cp:[''],
      contrasena:['',[Validators.required]]
    });
  }
  onSubmit(){
    this.modalumno = this.saveModalumno();
  }
  saveModalumno(){
    const saveModalumno={
      apellidoP: this.modalumnoForm.get('apellidoP').value,
      nombre: this.modalumnoForm.get('nombre').value,
      apellidoM: this.modalumnoForm.get('apellidoM').value,
      email: this.modalumnoForm.get('email').value,
      telefono: this.modalumnoForm.get('telefono').value,
      celular: this.modalumnoForm.get('celular').value,
      idDom: this.modalumnoForm.get('idDom').value,
      nss:this.modalumnoForm.get('nss').value,
      idMunicipio: this.modalumnoForm.get('idMunicipio').value,
      idEstado: this.modalumnoForm.get('idEstado').value,
      cp: this.modalumnoForm.get('cp').value,
      fechaNac: this.modalumnoForm.get('fechaNac').value,
      contrasena:this.modalumnoForm.get('contrasena').value,
    };
    return saveModalumno;
  }

}
