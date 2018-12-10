import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AbcService } from '../abc.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-preinscripciones-datos',
  templateUrl: './preinscripciones-datos.component.html',
  styleUrls: ['./preinscripciones-datos.component.css']
})
export class PreinscripcionesDatosComponent implements OnInit {
  modal:string;
  escuelaSelect: any[]=[];
  sexoSelect: any[]=[
    {id: 1, name: 'Masculino'},
    {id: 2, name: 'Femenino'},
    {id: 3, name: 'Indefinido'}
  ];
  idEstado:any;
  estadosSelect: any[]=[];
  idMunicipio:any;
  municipiosSelect: any[]=[];
  carreraSelect: any[]=[];
  preinscripcionForm: FormGroup;
  preinscripcion: any;
  loader:Boolean = false;
  successMessage: string;
  dangerMessage: string;
  private _success = new Subject<string>();
  private _danger = new Subject<string>();
  urlImagen: string = 'profile.png';
  urlActa: string;
  urlConstancia: string;
  urlCredencial: string;
  urlComprobante: string;
  idCandidato:number;
  idEscuela:number;
  constructor(private abc: AbcService, private pf: FormBuilder,private chRef: ChangeDetectorRef) { }

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
  public changeEsc(){
    console.log(this.idEscuela);
    this.carreraSelect=[];
    this.abc.getCarreras(this.idEscuela).subscribe((carreras: any) => {
        for (let carrera of carreras) {
        this.carreraSelect = [...this.carreraSelect, {id: carrera.idCarrera, name: carrera.descripcion}];
        }
    });
  }

  ngOnInit() {
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
    this._danger.subscribe((message) => this.dangerMessage = message);
    this._danger.pipe(
      debounceTime(5000)
    ).subscribe(() => this.dangerMessage = null);
    
    this.abc.getEstados().subscribe((data: any) => {
      for (let estado of data) {
        this.estadosSelect = [...this.estadosSelect, {id: estado.idEstado, name: estado.nombre}];
      }
    });
    this.abc.getEscuelas().subscribe((data: any) => {
      for (let escuela of data) {
      this.escuelaSelect = [...this.escuelaSelect, {id: escuela.idEscuela, name: escuela.nombre}];
      }
    });
    this.preinscripcionForm=this.pf.group({
      nombre:['',[ Validators.required]],
      apellidoP:['', [Validators.required]], 
      apellidoM:['', [Validators.required]],
      curp:['',[Validators.required]],
      sexo:['',[Validators.required]],
      fechaNac:['',[Validators.required]],
      idMunicipio:['',[Validators.required]],
      telefonoTutor:['',[Validators.required]],
      telefono:[''],
      idEstado:[''],
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
      urlActa:['',[Validators.required]],
      urlConstancia:['',[Validators.required]],
      urlCredencial:['',[Validators.required]],
      urlComprobante:['',[Validators.required]],
      idEscuela:['',[Validators.required]],
      idCarrera:['',[Validators.required]],
    });
  }
  onSubmit(){
    this.preinscripcion = this.savePreinscripcion();
    console.log(this.preinscripcion);
    this.abc.insertPreinscripcion(this.preinscripcion).subscribe(
      resp => {
        this.loader = false;
        if(resp.status){
          this.idCandidato = resp.msg;
          $("#modal").modal();
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
  savePreinscripcion(){
    const savePreinscripcion={
      nombre: this.preinscripcionForm.get('nombre').value,
      apellidoP: this.preinscripcionForm.get('apellidoP').value,
      apellidoM: this.preinscripcionForm.get('apellidoM').value,
      curp: this.preinscripcionForm.get('curp').value,
      sexo: this.preinscripcionForm.get('sexo').value,
      fechaNac: this.preinscripcionForm.get('fechaNac').value,
      idMunicipio: this.preinscripcionForm.get('idMunicipio').value,
      idEstado: this.preinscripcionForm.get('idEstado').value,
      telefono: this.preinscripcionForm.get('telefono').value,
      celular: this.preinscripcionForm.get('celular').value,
      email: this.preinscripcionForm.get('email').value,
      emailTutor: this.preinscripcionForm.get('emailTutor').value,
      cp: this.preinscripcionForm.get('cp').value,
      colonia: this.preinscripcionForm.get('colonia').value,
      calle: this.preinscripcionForm.get('calle').value,
      numero: this.preinscripcionForm.get('numero').value,
      nombreTutor: this.preinscripcionForm.get('nombreTutor').value,
      apellidoPTutor: this.preinscripcionForm.get('apellidoPTutor').value,
      apellidoMTutor: this.preinscripcionForm.get('apellidoMTutor').value,
      fechaNacTutor: this.preinscripcionForm.get('fechaNacTutor').value,
      telefonoTutor: this.preinscripcionForm.get('telefonoTutor').value,
      urlImagen: this.urlImagen,
      urlActa: this.urlActa,
      urlConstancia: this.urlConstancia,
      urlCredencial: this.urlCredencial,
      urlComprobante: this.urlComprobante,
      idEscuela: this.preinscripcionForm.get('idEscuela').value,
      idCarrera: this.preinscripcionForm.get('idCarrera').value,
    };
    return savePreinscripcion;
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

  public cargandoUrlActa(e){
    let doc:any = e.target;
    if(doc.files.length > 0){
      this.loader = true;
      let form = new FormData();
      form.append('file',doc.files[0]);
      this.abc.subirDoc(form).subscribe(
        resp => {
          this.loader = false;
          if(resp.status){
            this.urlActa = resp.generatedName;
          }else{
            this._danger.next('Revise la extención de su documento');
          }
        },
        error => {
          this.loader = false;
          this._danger.next('documento supera el tamaño permitido');
        }
      );
    }
  }

  public cargandoUrlConstancia(e){
    let doc:any = e.target;
    if(doc.files.length > 0){
      this.loader = true;
      let form = new FormData();
      form.append('file',doc.files[0]);
      this.abc.subirDoc(form).subscribe(
        resp => {
          this.loader = false;
          if(resp.status){
            this.urlConstancia = resp.generatedName;
          }else{
            this._danger.next('Revise la extención de su documento');
          }
        },
        error => {
          this.loader = false;
          this._danger.next('documento supera el tamaño permitido');
        }
      );
    }
  }

  public cargandoUrlCredencial(e){
    let doc:any = e.target;
    if(doc.files.length > 0){
      this.loader = true;
      let form = new FormData();
      form.append('file',doc.files[0]);
      this.abc.subirDoc(form).subscribe(
        resp => {
          this.loader = false;
          if(resp.status){
            this.urlCredencial = resp.generatedName;
          }else{
            this._danger.next('Revise la extención de su documento');
          }
        },
        error => {
          this.loader = false;
          this._danger.next('documento supera el tamaño permitido');
        }
      );
    }
  }

  public cargandoUrlComprobante(e){
    let doc:any = e.target;
    if(doc.files.length > 0){
      this.loader = true;
      let form = new FormData();
      form.append('file',doc.files[0]);
      this.abc.subirDoc(form).subscribe(
        resp => {
          this.loader = false;
          if(resp.status){
            this.urlComprobante = resp.generatedName;
          }else{
            this._danger.next('Revise la extención de su documento');
          }
        },
        error => {
          this.loader = false;
          this._danger.next('documento supera el tamaño permitido');
        }
      );
    }
  }

}
