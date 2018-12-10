import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AbcService } from '../abc.service';
import { Administrador } from '../modelos';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css']
})
export class InscripcionesComponent implements OnInit {
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
  grupoSelect: any[]=[];
  inscripcionForm: FormGroup;
  inscripcion: any;
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
  successMessage: string;
  dangerMessage: string;
  private _success = new Subject<string>();
  private _danger = new Subject<string>();
  staticAlertClosed = false;
  urlImagen :string = 'profile.png';
  constructor(private pf: FormBuilder,private abc: AbcService) { }
  public change(){
    console.log(this.idEstado);
    this.abc.getMunicipioEdo(this.idEstado).subscribe((data: any) => {
       this.municipiosSelect=[];
       if (data != null){
        for (let municipio of data) {
          this.municipiosSelect = [...this.municipiosSelect, {id: municipio.idMunicipio, name: municipio.nombre}];
        }
       }
    });
  }
  public buscar(event: any){
    if (event.keyCode == 13)
    {
      this.abc.getCandidatoCurp(this.curp).subscribe((data:any)=>{
        this.abc.getMunicipio(data.idMunicipio).subscribe((mun: any) => {
          this.urlImagen = data.urlImagen;
          this.idEstado=mun.idEstado;
          this.change();
          console.log(mun);
        });
        this.abc.getTutorCandidato(data.idCandidato).subscribe((tutor:any)=>{
          this.inscripcionForm=this.pf.group({
            nombre : data.nombre,
            apellidoP: data.apellidoP, 
            apellidoM: data.apellidoM,
            curp: data.curp,
            sexo: Number(data.sexo),
            fechaNac:data.fechaNac,
            idMunicipio: data.idMunicipio,
            celular: data.celular,
            telefono:data.telefono,
            email: data.email,
            colonia: data.colonia,
            cp: data.cp,
            calle: data.calle,
            numero: data.numero,
            urlImagen: data.urlImagen,
            idEscuela: data.idEscuela,
            nombreTutor:tutor.nombre,
            apellidoPTutor:tutor.apellidoP,
            apellidoMTutor:tutor.apellidoM,
            fechaNacTutor:tutor.fechaNac,
            emailTutor:tutor.email,
            telefonoTutor:tutor.celular,
            urlCertificado:'',
            idGrupo:'',
            idSubCiclo:'',
            idCiclo:'',
            idPeriodo:''
          });
        });
      });
    }
  }

  ngOnInit() {
      this.abc.getEstados().subscribe((data: any) => {
        for (let estado of data) {
          this.estadosSelect = [...this.estadosSelect, {id: estado.idEstado, name: estado.nombre}];
        }
      });
      this.idUsuario=localStorage.getItem('idUsuario');
      this.abc.getAdministrador_Usuario(this.idUsuario).subscribe((data: any) => {
        this.administradorUser=data;
        this.abc.getEscuela_Id(data.idEscuela).subscribe((escuela:any)=>{
          this.escuela = escuela.nombre;
        });
      });
      setTimeout(() => this.staticAlertClosed = true, 20000);
      this._success.subscribe((message) => this.successMessage = message);
      this._success.pipe(
        debounceTime(5000)
      ).subscribe(() => this.successMessage = null);
      this._danger.subscribe((message) => this.dangerMessage = message);
      this._danger.pipe(
        debounceTime(5000)
      ).subscribe(() => this.dangerMessage = null);
    this.inscripcionForm=this.pf.group({
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
      urlImagen:['',[Validators.required]],
      urlCertificado:['',[Validators.required]],
      idGrupo:['',[Validators.required]],
      idSubCiclo:['',[Validators.required]],
      idCiclo:['',[Validators.required]],
      idPeriodo:['',[Validators.required]],
      idEscuela: [''],
    });
  }
  onSubmit(){
    this.inscripcion = this.saveInscripcion();
  }
  saveInscripcion(){
    const saveInscripcion={
      nombre: this.inscripcionForm.get('nombre').value,
      apellidoP: this.inscripcionForm.get('apellidoP').value,
      apellidoM: this.inscripcionForm.get('apellidoM').value,
      curp: this.inscripcionForm.get('curp').value,
      sexo: this.inscripcionForm.get('sexo').value,
      fechaNac: this.inscripcionForm.get('fechaNac').value,
      idMunicipio: this.inscripcionForm.get('idMunicipio').value,
      idEstado: this.inscripcionForm.get('idEstado').value,
      telefono: this.inscripcionForm.get('telefono').value,
      celular: this.inscripcionForm.get('celular').value,
      email: this.inscripcionForm.get('email').value,
      emailTutor: this.inscripcionForm.get('emailTutor').value,
      cp: this.inscripcionForm.get('cp').value,
      colonia: this.inscripcionForm.get('colonia').value,
      calle: this.inscripcionForm.get('calle').value,
      numero: this.inscripcionForm.get('numero').value,
      nombreTutor: this.inscripcionForm.get('nombreTutor').value,
      apellidoPTutor: this.inscripcionForm.get('apellidoPTutor').value,
      apellidoMTutor: this.inscripcionForm.get('apellidoMTutor').value,
      fechaNacTutor: this.inscripcionForm.get('fechaNacTutor').value,
      telefonoTutor: this.inscripcionForm.get('telefonoTutor').value,
      urlImagen: this.inscripcionForm.get('urlImagen').value,
      urlCertificado: this.inscripcionForm.get('urlCertificado').value,
      idEscuela: this.administradorUser.idEscuela,
      idGrupo: this.inscripcionForm.get('idGrupo').value,
      idCiclo: this.inscripcionForm.get('idCiclo').value,
      idSubCiclo: this.inscripcionForm.get('idSubCiclo').value,
      idPeriodo: this.inscripcionForm.get('idPeriodo').value,
    };
    return saveInscripcion;
  }


}
