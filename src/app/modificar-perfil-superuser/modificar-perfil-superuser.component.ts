import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AbcService } from '../abc.service';
import { Administrador } from '../modelos';
@Component({
  selector: 'app-modificar-perfil-superuser',
  templateUrl: './modificar-perfil-superuser.component.html',
  styleUrls: ['./modificar-perfil-superuser.component.css']
})
export class ModificarPerfilSuperuserComponent implements OnInit {
  modulo:string='Modificar Perfil';
  modsuperForm: FormGroup;
  modsuper: Administrador;
  idUsuario:any;
  administrador:Administrador={
    idAdministrador:0,
    nombre:'',
    apellidoP:'',
    apellidoM:'',
    email:'',
    contrasena:'',
    idUsuario:0,
    idEscuela:0,
    estatus:0,
    imagen:''
  };
  constructor(private pf: FormBuilder,private abc:AbcService) {
    this.iniciar();
   }
  public iniciar(){
    this.idUsuario=localStorage.getItem('idUsuario');
    this.abc.getAdministrador_Usuario(this.idUsuario).subscribe((data: any) => {
      this.administrador=data;
      this.modsuperForm=this.pf.group({
        idAdministrador:[data.idAdministrador],
        nombre:[data.nombre,[ Validators.required]],
        apellidoP:[data.apellidoP,[ Validators.required]],
        apellidoM:[data.apellidoM,[ Validators.required]],
        email:[data.email,[ Validators.required,Validators.email]],
        contrasena:[data.contrasena,[ Validators.required]],
        idUsuario:[data.idUsuario],
        idEscuela:[data.idEscuela],
        estatus:[data.estatus],
        imagen:[data.imagen]
      });
    });
  }
  ngOnInit() {
    this.modsuperForm=this.pf.group({
      idAdministrador:[''],
      nombre:['',[ Validators.required]],
      apellidoP:['',[ Validators.required]],
      apellidoM:['',[ Validators.required]],
      email:['',[ Validators.required,Validators.email]],
      contrasena:['',[ Validators.required]],
      idUsuario:[],
      idEscuela:[],
      estatus:[],
      imagen:[]
    });
  }
  onSubmit(){
    this.modsuper = this.saveModsuper();
    this.abc.updateAdministrador(this.modsuper).subscribe(res => {
      this.iniciar();
    }, (err) => {
      console.log(err);
    }
   )
  }
  saveModsuper(){
    const saveModsuper={
      idAdministrador:this.modsuperForm.get('idAdministrador').value,
      nombre:this.modsuperForm.get('nombre').value,
      apellidoP:this.modsuperForm.get('apellidoP').value,
      apellidoM:this.modsuperForm.get('apellidoM').value,
      email:this.modsuperForm.get('email').value,
      contrasena:this.modsuperForm.get('contrasena').value,
      idUsuario:this.modsuperForm.get('idUsuario').value,
      idEscuela:this.modsuperForm.get('idEscuela').value,
      estatus:this.modsuperForm.get('estatus').value,
      imagen:this.modsuperForm.get('imagen').value
    };
    return saveModsuper;
  }

}
