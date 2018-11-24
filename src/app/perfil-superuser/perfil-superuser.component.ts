import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AbcService } from '../abc.service';
import { Administrador } from '../modelos';

@Component({
  selector: 'app-perfil-superuser',
  templateUrl: './perfil-superuser.component.html',
  styleUrls: ['./perfil-superuser.component.css']
})
export class PerfilSuperuserComponent implements OnInit {
  modulo:string='Perfil';
  administradorForm:FormGroup;
  administrador:Administrador;
  escuelaForm:FormGroup;
  constructor(private abc: AbcService, private pf: FormBuilder) { 
    this.abc.getAdministrador(1).subscribe((data: any) => {
      console.log(data);
      this.administradorForm=this.pf.group({
        idAdministrador: data.idAdministrador,
        nombre: data.nombre,
        apellidoP: data.apellidoP,
        apellidoM: data.apellidoM,
        email: data.email,
        contrasena: data.contrasena,
        idUsuario: data.idUsuario,
        idEscuela: data.idEscuela,
        estatus: data.estatus
      });
    });
  }
  public inicializarForm(){
    this.administradorForm = this.pf.group({
      idAdministrador: [''],
      nombre: ['',[ Validators.required]],
      apellidoP: ['',[ Validators.required]],
      apellidoM: ['',[ Validators.required]],
      email: ['',[ Validators.required]],
      contrasena:[''],
      idUsuario: [''],
      idEscuela: ['',[ Validators.required]],
      estatus:['']
    });
   }
  ngOnInit() {
    this.inicializarForm();
  }

}
