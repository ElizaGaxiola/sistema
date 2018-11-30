import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AbcService } from '../abc.service';
import { Administrador } from '../modelos';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
declare var jQuery:any;
declare var $:any;

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
  loader:Boolean = false;
  successMessage: string;
  dangerMessage: string;
  private _success = new Subject<string>();
  private _danger = new Subject<string>();
  staticAlertClosed = false;
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
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
    this._danger.subscribe((message) => this.dangerMessage = message);
    this._danger.pipe(
      debounceTime(5000)
    ).subscribe(() => this.dangerMessage = null);

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
      this._success.next('Datos actualizados con éxito');
    }, (err) => {
      this._danger.next('A ocurrido un error intentalo de nuevo');
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
      imagen:this.administrador.imagen
    };
    return saveModsuper;
  }
  public cargandoImagen(e){
    let img:any = e.target;
    if(img.files.length > 0){
      this.loader = true;
      let form = new FormData();
      form.append('file',img.files[0]);
      
      this.abc.subirImagenAdmin(form).subscribe(
        resp => {
          this.loader = false;
          if(resp.status){
            this.administrador.imagen = resp.generatedName;
          }else{
            this._danger.next('Revise la extención de su imagen');
          }
        },
        error => {
          this.loader = false;
          alert('Imagen supera el tamaño permitido');
        }
      );
      
    }


  }
  

}
