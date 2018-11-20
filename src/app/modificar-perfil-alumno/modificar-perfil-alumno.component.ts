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
      app:['',[ Validators.required]],
      nombre:['',[ Validators.required]],
      apm:['',[ Validators.required]],
      correo:['',[ Validators.required, Validators.email]],
      idTelefono:['',[ Validators.required]],
      idCelular:['',[ Validators.required]],
      idDom:['',[ Validators.required]],
      idCp:['',[ Validators.required]]
    });
  }
  onSubmit(){
    this.modalumno = this.saveModalumno();
  }
  saveModalumno(){
    const saveModalumno={
      app: this.modalumnoForm.get('app').value,
      nombre: this.modalumnoForm.get('nombre').value,
      apm: this.modalumnoForm.get('apm').value,
      correo: this.modalumnoForm.get('correo').value,
      idTelefono: this.modalumnoForm.get('idTelefono').value,
      idCelular: this.modalumnoForm.get('idCelular').value,
      idDom: this.modalumnoForm.get('idDom').value,
      idCp: this.modalumnoForm.get('idCp').value
    };
    return saveModalumno;
  }

}
