import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AbcService } from '../abc.service';
import { Administrador } from '../modelos';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
declare var jQuery:any;
declare var $:any;

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
  public changeCiclo(){
    console.log(this.idCiclo);
    this.subcicloSelect=[];
    this.inscripcionForm.get ('idSubCiclo') .reset (); 
    this.abc.getSubCiclos_Ciclos(this.idCiclo).subscribe((data:any) => {
      for (let subCiclo of data) {
        this.subcicloSelect = [...this.subcicloSelect, {id: subCiclo.idSubCiclo, name: subCiclo.descripcion}];
      }
    });
  }
  public buscar(event: any){
    if (event.keyCode == 13)
    {
      this.abc.getCandidatoCurp(this.curp,this.administradorUser.idEscuela).subscribe((data:any)=>{
        if(data.status==false){
          this._danger.next(data.msg);
        }else{
          this.periodoSelect=[];
          this.abc.getPeriodos(data.idEscuela).subscribe((esc: any) => {
            for (let item of esc) {
              if (item.idCarrera == data.idCarrera){
                this.id={idSeccion:item.idSeccion,idPeriodo:item.idPeriodo,idCarrera:item.idCarrera};
                this.periodoSelect = [...this.periodoSelect, {id:this.id, name: item.descripcion}];
              }
            }
          });
          this.abc.getMunicipio(data.idMunicipio).subscribe((mun: any) => {
            this.urlImagen = data.urlImagen;
            this.idEstado=mun.idEstado;
            this.change();
            console.log(mun);
          });
          for (var _i = 0; _i < 8; _i++) {
            this.matricula = this.matricula + Math.floor(Math.random() * 10).toString();
          }
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
              idSubCiclo:[],
              idCiclo:[],
              idPeriodo:[],
              idSeccion: [],
              idCarrera:[],
              cardexDoc: data.cardexDoc ,
              actaNacDoc:data.actaNacDoc,
              comprobanteDoc:data.comprobanteDoc,
              credencialDoc:data.credencialDoc,
              matricula:this.matricula
            });
          });
        }
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
        this.abc.getCiclos(data.idEscuela).subscribe((ciclos: any) => {
          for (let ciclo of ciclos) {
            this.cicloSelect = [...this.cicloSelect, {id: ciclo.idCiclo, name: ciclo.descripcion}];
          }
        });
        this.abc.getEscuela_Id(data.idEscuela).subscribe((escuela:any)=>{
          this.escuela = escuela.nombre;
        });
        this.abc.getPeriodos(data.idEscuela).subscribe((data: any) => {
          for (let item of data) {
            this.id={idSeccion:item.idSeccion,idPeriodo:item.idPeriodo,idCarrera:item.idCarrera};
            this.periodoSelect = [...this.periodoSelect, {id:this.id, name: item.descripcion}];
          }
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
    this.inscripcion = this.saveInscripcion();
    console.log(this.inscripcion);
    this.abc.insertIscripcion(this.inscripcion).subscribe(
      resp => {
        this.loader = false;
        if(resp.status){
          this.idAlumno = resp.msg;
          this.contra = resp.contra;
         
          $("#modal").modal();
          this.inscripcionForm.reset();
        }else{
          this._danger.next('A ocurrido un error, por favor vuelve a intentarlo');
        }
      },
      error => {
        this.loader = false;
        this._danger.next(' error vuelva a intentarlo ');
      }
    );
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
      urlImagen: this.urlImagen,
      idEscuela: this.administradorUser.idEscuela,
      idCiclo: this.inscripcionForm.get('idCiclo').value,
      idSubCiclo: this.inscripcionForm.get('idSubCiclo').value,
      idPeriodo: this.id.idPeriodo,
      idSeccion: this.id.idSeccion,
      idCarrera: this.id.idCarrera,
      cardexDoc: this.inscripcionForm.get('cardexDoc').value,
      actaNacDoc: this.inscripcionForm.get('actaNacDoc').value,
      comprobanteDoc:this.inscripcionForm.get('comprobanteDoc').value,
      credencialDoc:this.inscripcionForm.get('credencialDoc').value,
      matricula:this.inscripcionForm.get('matricula').value,
    };
    return saveInscripcion;
  }
  public cargandoImagen(e){
    let img:any = e.target;
    if(img.files.length > 0){
      this.loader = true;
      let form = new FormData();
      form.append('file',img.files[0]);
      this.abc.subirImagenAsp(form).subscribe(
        resp => {
          this.loader = false;
          if(resp.status){
            this.urlImagen = resp.generatedName;
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
