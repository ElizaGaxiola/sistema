import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AbcService } from '../abc.service';
import { AuthService } from '../auth.service';
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
  constructor(private abc: AbcService,private auth: AuthService, private pf: FormBuilder) { 
    console.log(localStorage.getItem('idUsuario'));
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
