import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
@Component({
  selector: 'app-modificar-perfil-administrativo',
  templateUrl: './modificar-perfil-administrativo.component.html',
  styleUrls: ['./modificar-perfil-administrativo.component.css']
})
export class ModificarPerfilAdministrativoComponent implements OnInit {
  modulo:string='Modificar Perfil';
  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);
  moddocenteForm: FormGroup;
  moddocente: any;
  constructor(private pf: FormBuilder) { }
  
  ngOnInit() {
    this.moddocenteForm=this.pf.group({
      app:['',[ Validators.required]],
      nombre:['',[ Validators.required]],
      apm:['',[ Validators.required]],
      correo:['',[ Validators.required, Validators.email]],
      tel:['',[ Validators.required]],
      telcel:['',[ Validators.required, Validators.minLength(10)]],
      contra:['',[Validators.required]]
    });
  }
  onSubmit(){
    this.moddocente = this.saveModdocente();
  }
  saveModdocente(){
    const saveModdocente={
      app: this.moddocenteForm.get('app').value,
      nombre: this.moddocenteForm.get('nombre').value,
      apm: this.moddocenteForm.get('apm').value,
      correo: this.moddocenteForm.get('correo').value,
      tel: this.moddocenteForm.get('tel').value,
      telcel: this.moddocenteForm.get('telcel').value,
      contra:this.moddocenteForm.get('contra').value
    };
    return saveModdocente;
  }

}
