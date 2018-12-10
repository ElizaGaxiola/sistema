import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AbcService } from '../abc.service';
import { Administrador } from '../modelos';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-reinscripcion',
  templateUrl: './reinscripcion.component.html',
  styleUrls: ['./reinscripcion.component.css']
})
export class ReinscripcionComponent implements OnInit {
  escuelaSelect: any[]=[];
  sexoSelect: any[]=[
    {id: 1, name: 'Masculino'},
    {id: 2, name: 'Femenino'},
    {id: 3, name: 'Indefinido'}
  ];
  escuela:string;
  municipiosSelect: any[]=[];
  idEstado:number;
  estadosSelect: any[]=[];
  cicloSelect: any[]=[];
  subcicloSelect: any[]=[];
  periodoSelect: any[]=[];
  reinscripcionForm: FormGroup;
  reinscripcion: any;
  curp:string;
  idUsuario: any;
  administradorUser:Administrador={
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
  telefono: string;
  loader:Boolean = false;
  successMessage: string;
  dangerMessage: string;
  private _success = new Subject<string>();
  private _danger = new Subject<string>();
  staticAlertClosed = false;
  urlImagen :string = 'profile.png';
  idCiclo:number;
  idSubCiclo:number;
  idPeriodo:any;
  id: { idSeccion: any; idPeriodo: any; idCarrera: any; };
  idAlumno: any;
  matricula:string='';
  contra:string='';
  constructor(private pf: FormBuilder) { }

  ngOnInit() {
    this.reinscripcionForm=this.pf.group({
      nombre:['',[ Validators.required]],
      apellidoP:['', [Validators.required]], 
      apellidoM:['', [Validators.required]],
      curp:['',[Validators.required]],
      sexo:['',[Validators.required]],
      fechaNac:['',[Validators.required]],
      idMunicipio:['',[Validators.required]],
      telefonoTutor:['',[Validators.required]],
      telefono:[''],
      celular:['',[Validators.required]],
      email:['',[Validators.required, Validators.email]],
      colonia:['',[ Validators.required]],
      cp:['',[ Validators.required]],
      calle:['',[ Validators.required]],
      numero:['',[ Validators.required]],
      nombreTutor:['',[ Validators.required]],
      apellidoPTutor:['', [Validators.required]], 
      apellidoMTutor:['', [Validators.required]],
      fechaNacTutor:['',[Validators.required]],
      emailTutor:['',[Validators.required, Validators.email]],
      urlImagen:[''],
      idSubCiclo:['',[Validators.required]],
      idCiclo:['',[Validators.required]],
      idPeriodo:['',[Validators.required]],
      idSeccion: [''],
      idCarrera:[''],
      idEscuela: [''],
      cardexDoc: [''],
      actaNacDoc:[''],
      comprobanteDoc:[''],
      credencialDoc:[''],
      matricula:['']
    });
  }
  onSubmit(){
    this.reinscripcion = this.saveReinscripcion();
    
  }
  saveReinscripcion(){
    const saveReinscripcion={
      nombre: this.reinscripcionForm.get('nombre').value,
      apellidoP: this.reinscripcionForm.get('apellidoP').value,
      apellidoM: this.reinscripcionForm.get('apellidoM').value,
      curp: this.reinscripcionForm.get('curp').value,
      sexo: this.reinscripcionForm.get('sexo').value,
      fechaNac: this.reinscripcionForm.get('fechaNac').value,
      idMunicipio: this.reinscripcionForm.get('idMunicipio').value,
      telefono: this.reinscripcionForm.get('telefono').value,
      celular: this.reinscripcionForm.get('celular').value,
      email: this.reinscripcionForm.get('email').value,
      emailTutor: this.reinscripcionForm.get('emailTutor').value,
      cp: this.reinscripcionForm.get('cp').value,
      colonia: this.reinscripcionForm.get('colonia').value,
      calle: this.reinscripcionForm.get('calle').value,
      numero: this.reinscripcionForm.get('numero').value,
      nombreTutor: this.reinscripcionForm.get('nombreTutor').value,
      apellidoPTutor: this.reinscripcionForm.get('apellidoPTutor').value,
      apellidoMTutor: this.reinscripcionForm.get('apellidoMTutor').value,
      fechaNacTutor: this.reinscripcionForm.get('fechaNacTutor').value,
      telefonoTutor: this.reinscripcionForm.get('telefonoTutor').value,
      urlImagen: this.urlImagen,
      idEscuela: this.administradorUser.idEscuela,
      idCiclo: this.reinscripcionForm.get('idCiclo').value,
      idSubCiclo: this.reinscripcionForm.get('idSubCiclo').value,
      idPeriodo: this.id.idPeriodo,
      idSeccion: this.id.idSeccion,
      idCarrera: this.id.idCarrera,
      cardexDoc: this.reinscripcionForm.get('cardexDoc').value,
      actaNacDoc: this.reinscripcionForm.get('actaNacDoc').value,
      comprobanteDoc:this.reinscripcionForm.get('comprobanteDoc').value,
      credencialDoc:this.reinscripcionForm.get('credencialDoc').value,
      matricula:this.reinscripcionForm.get('matricula').value,
    };
    return saveReinscripcion;
  }
}
