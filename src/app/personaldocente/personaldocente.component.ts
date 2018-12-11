import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Docente, Administrador} from '../modelos';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AbcService } from '../abc.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-personaldocente',
  templateUrl: './personaldocente.component.html',
  styleUrls: ['./personaldocente.component.css']
})
export class PersonaldocenteComponent implements OnInit {
  bsValue:any;
  fecha:any;
  modal:string;
  modulo:string='Personal Docente';
  docenteForm:FormGroup;
  docente: Docente;
  sexoSelect: any[]=[
    {id: 1, name: 'Masculino'},
    {id: 2, name: 'Femenino'},
    {id: 3, name: 'Indefinido'}
  ];
  idEstado:any;
  estadosSelect: any[]=[];
  idMunicipio:any;
  municipiosSelect: any[]=[];
  dataModel:any[] = ['101','102','103']
  dataTable: any;
  data: Docente[]=[];
  successMessage: string;
  dangerMessage: string;
  private _success = new Subject<string>();
  private _danger = new Subject<string>();
  staticAlertClosed = false;
  idUsuario: any;
  administradorUser:Administrador;
  constructor(private abc: AbcService, private pf: FormBuilder,private chRef: ChangeDetectorRef) {
    this.abc.getEstados().subscribe((data: any) => {
      for (let estado of data) {
        this.estadosSelect = [...this.estadosSelect, {id: estado.idEstado, name: estado.nombre}];
      }
    });
  }
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
  public obtenerDocentes(){
    this.abc.getDocenetes(this.administradorUser.idEscuela)
    .subscribe((data: any) => {
      this.data=data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable();
      console.log(data);
    });
  }
  public agregar(){
    this.inicializarForm();
    this.modal = 'agregar';
    $("#modal").modal();
    alert('enter');
  }
  public modificar(idDocente:number){
    this.modal = 'modificar';
    this.abc.getDocenete(idDocente).subscribe((data: any) => {
      console.log(data);
      this.fecha=data.fechaNac.split('-');
      this.bsValue=new Date(this.fecha[0],this.fecha[1]-1,this.fecha[2]);
      console.log(this.fecha);
      this.abc.getMunicipio(data.idMunicipio).subscribe((data: any) => {
        this.idEstado=data.idEstado;
        this.change();
      });
      this.docenteForm=this.pf.group({
        idDocente: data.idDocente,
        nombre: data.nombre,
        apellidoP:data.apellidoP,
        apellidoM: data.apellidoM,
        fechaNac:data.fechaNac,
        nss: data.nss,
        telefonol: data.telefono,
        titulo: data.titulo,
        curp:data.curp,
        sexo:Number(data.sexo),
        idMunicipio: data.idMunicipio,
        colonia: data.colonia,
        calle: data.calle,
        numero: data.numero,
        cp:data.cp,
        urlImagen: data.urlImagen,
        usuarioId: data.usuarioId,
        estatus: data.estatus,
        escuelaId: data.escuelaId,
        idUsuario: data.idUsuario,
        idTipo:data.idTipo,
        usuario:data.usuario,
        contrasena:data.contrasena,
      });
      $("#modal").modal();
    });
    
  }
  public modificarDocente(docente:Docente){
    console.log(docente);
    this.abc.updateDocenete(docente)
    .subscribe(res => {
        this._success.next('Datos modificados con éxito');
        console.log('actualizado');
        this.obtenerDocentes();
      }, (err) => {
        this._danger.next('A ocurrido un error intentalo de nuevo');
        console.log(err);
      }
    );
  }
  public status(id:number,estatus:number){
    this.abc.getDocenete(id)
    .subscribe((data: any) => {
      this.docente=data;
      if (estatus == 0)
        this.docente.estatus=1;
      else
        this.docente.estatus=0;
      this.modificarDocente(this.docente); 
    }); 
  }
  ngOnInit(): void {
    this.idUsuario=localStorage.getItem('idUsuario');
    this.abc.getAdministrador_Usuario(this.idUsuario).subscribe((data: any) => {
      this.administradorUser=data;
      this.obtenerDocentes();
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
    this.inicializarForm();
  }
  onSubmit(){
    this.docente = this.saveDocente();
    if (this.modal=='modificar'){
      this.abc.updateDocenete(this.docente).subscribe(res => {
        this.obtenerDocentes();
        this._success.next('Datos modificados con éxito');
        $("#modal").modal('hide');
      }, (err) => {
        this._danger.next('A ocurrido un error intentalo de nuevo');
        console.log(err);
      }
     );
    }else{
      this.abc.insertDocenete(this.docente).subscribe(res => {
        this.obtenerDocentes();
        $("#modal-modificar").modal('hide');
        this._success.next('Datos modificados con éxito');
      }, (err) => {
        console.log(err);
        this._danger.next('A ocurrido un error intentalo de nuevo');
      }
     );
    }
  }
  public inicializarForm(){
    this.docenteForm = this.pf.group({
      idDocente: [''],
      nombre: ['',[Validators.required]],
      apellidoP: ['',[Validators.required]],
      apellidoM: ['',[Validators.required]],
      fechaNac: ['',[Validators.required]],
      nss: ['',[Validators.required]],
      telefonol: ['',[Validators.required]],
      titulo: ['',[Validators.required]],
      curp:['',[Validators.required]],
      sexo:['',[Validators.required]],
      idMunicipio: ['',[Validators.required]],
      colonia:['',[Validators.required]],
      calle: ['',[Validators.required]],
      numero: ['',[Validators.required]],
      cp: ['',[Validators.required]],
      urlImagen: [''],
      usuarioId:[''],
      estatus: [''],
      escuelaId: [1],
      idUsuario:[''],
      idTipo:[''],
      usuario:['',[Validators.required, Validators.email]],
      contrasena: [''],
    });
   }
  public saveDocente(){
    const saveDocente ={
        idDocente: this.docenteForm.get('idDocente').value,
        nombre: this.docenteForm.get('nombre').value,
        apellidoP: this.docenteForm.get('apellidoP').value,
        apellidoM: this.docenteForm.get('apellidoM').value,
        fechaNac: this.docenteForm.get('fechaNac').value,
        nss: this.docenteForm.get('nss').value,
        telefono: this.docenteForm.get('telefonol').value,
        titulo: this.docenteForm.get('titulo').value,
        curp: this.docenteForm.get('curp').value,
        sexo: this.docenteForm.get('sexo').value,
        idMunicipio: this.docenteForm.get('idMunicipio').value,
        colonia: this.docenteForm.get('colonia').value,
        calle: this.docenteForm.get('calle').value,
        numero: this.docenteForm.get('numero').value,
        cp: this.docenteForm.get('cp').value,
        urlImagen: this.docenteForm.get('urlImagen').value,
        usuarioId: this.docenteForm.get('usuarioId').value,
        estatus: this.docenteForm.get('estatus').value,
        escuelaId: this.administradorUser.idEscuela,
        idUsuario:this.docenteForm.get('idUsuario').value,
        idTipo:this.docenteForm.get('idTipo').value,
        usuario:this.docenteForm.get('usuario').value,
        contrasena: this.docenteForm.get('contrasena').value,
    }
    return saveDocente;
  }
}
