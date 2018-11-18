import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

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
modalumnoForm: FormGroup;
modalumno: any;
constructor(private pf: FormBuilder) { }

  ngOnInit() {
    this.modalumnoForm=this.pf.group({
      idNombre:['',[ Validators.required]],
      idApp:['',[ Validators.required]],
      idApm:['',[ Validators.required]],
      idNumSocial:['',[ Validators.required]],
      idEmail:['',[ Validators.required, Validators.email]],
      idTelefono:['',[ Validators.required]],
      idCelular:['',[ Validators.required]],
      idCp:['',[ Validators.required]],
      
     
    });
  }
  onSubmit(){
    this.modalumno = this.saveModalumno();
  }
  saveModalumno(){
    const saveModalumno={
      idNombre: this.modalumnoForm.get('idNombre').value,
      idApp: this.modalumnoForm.get('idApp').value,
      idApm: this.modalumnoForm.get('idApm').value,
      idNumSocial: this.modalumnoForm.get('idNumSocial').value,
      idEmail: this.modalumnoForm.get('idEmail').value,
      idTelefono: this.modalumnoForm.get('idTelefono').value,
      idCelular: this.modalumnoForm.get('idCelular').value,
      idCp: this.modalumnoForm.get('idCp').value,
      
    };
    return saveModalumno;
  }

}
