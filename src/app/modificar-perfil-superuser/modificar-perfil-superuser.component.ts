import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
@Component({
  selector: 'app-modificar-perfil-superuser',
  templateUrl: './modificar-perfil-superuser.component.html',
  styleUrls: ['./modificar-perfil-superuser.component.css']
})
export class ModificarPerfilSuperuserComponent implements OnInit {
  modulo:string='Modificar Perfil';
  modsuperForm: FormGroup;
  modsuper: any;
  constructor(private pf: FormBuilder) { }

  ngOnInit() {
    this.modsuperForm=this.pf.group({
      app:['',[ Validators.required]],
      nombre:['',[ Validators.required]],
      apm:['',[ Validators.required]],
      correo:['',[ Validators.required, Validators.email]],
      contra:['',[Validators.required]]
    });
  }
  onSubmit(){
    this.modsuper = this.saveModsuper();
  }
  saveModsuper(){
    const saveModsuper={
      app: this.modsuperForm.get('app').value,
      nombre: this.modsuperForm.get('nombre').value,
      apm: this.modsuperForm.get('apm').value,
      correo: this.modsuperForm.get('correo').value,
      contra:this.modsuperForm.get('contra').value
    };
    return saveModsuper;
  }

}
