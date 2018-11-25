import { Component, OnDestroy, OnInit } from '@angular/core';
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
  modal:string;
  modulo:string='Personal Docente';
  docenteForm:FormGroup;
  docente: Docente;
  seccionesSelect: any[]=[
    {id:1,name:'Masculino'},
    {id:2,name:'Femenino'},
    {id:3,name:'Indefinido'}
  ];
  idEstado:any;
  estadosSelect: any[]=[];
  idMunicipio:any;
  municipiosSelect: any[]=[];
  dataModel:any[] = ['101','102','103']
  dtOptions: DataTables.Settings = {};
  data: Docente[]=[];
  successMessage: string;
  dangerMessage: string;
  private _success = new Subject<string>();
  private _danger = new Subject<string>();
  staticAlertClosed = false;
  idUsuario: any;
  administradorUser:Administrador;
  constructor(private abc: AbcService, private pf: FormBuilder) {}

  public obtenerDocentes(){
    this.abc.getDocenetes(this.administradorUser.idEscuela)
    .subscribe((data: any) => {
      this.data=data;
      console.log(data);
    });
  }
  public agregar(){
    this.inicializarForm();
    this.modal = 'agregar';
    $("#modal").modal();
    alert('enter');
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
    this.dtOptions = {
      language: {
        "emptyTable": "Sin resultados encontrados",
        "info": " _START_ - _END_ / _TOTAL_ ",
        "infoEmpty": "0-0 /0",
        "infoFiltered": "",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "Mostrar _MENU_ registros",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "search": "<i class='fas fa-search'></i>",
        "zeroRecords": "Sin resultados encontrados",
        "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "Siguiente",
            "previous": "Anterior"
        }
      }
    };
  }
  onSubmit(){
    this.docente = this.saveDocente();
  }
  public inicializarForm(){
    this.docenteForm = this.pf.group({
      idEscuela: [''],
      idDocente: [''],
      nombre: ['',[Validators.required]],
      apellidoP: ['',[Validators.required]],
      apellidoM: ['',[Validators.required]],
      fechaNac: ['',[Validators.required]],
      nss: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      telefonol: ['',[Validators.required]],
      titulo: ['',[Validators.required]],
      curp:['',[Validators.required]],
      sexo:['',[Validators.required]],
      idMunicipio: ['',[Validators.required]],
      colonia:['',[Validators.required]],
      calle: ['',[Validators.required]],
      numero: ['',[Validators.required]],
      cp: ['',[Validators.required]],
      contrasena: ['',[Validators.required]],
      urlImagen: ['',[Validators.required]],
      estatus: [''],
      escuelaId: ['1',[Validators.required]],
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
        email: this.docenteForm.get('email').value,
        telefonol: this.docenteForm.get('telefonol').value,
        titulo: this.docenteForm.get('titulo').value,
        curp: this.docenteForm.get('curp').value,
        sexo: this.docenteForm.get('sexo').value,
        idMunicipio: this.docenteForm.get('idMunicipio').value,
        colonia: this.docenteForm.get('colonia').value,
        calle: this.docenteForm.get('calle').value,
        numero: this.docenteForm.get('numero').value,
        cp: this.docenteForm.get('cp').value,
        contrasena: this.docenteForm.get('contrasena').value,
        urlImagen: this.docenteForm.get('urlImagen').value,
        estatus: this.docenteForm.get('status').value,
        escuelaId: this.docenteForm.get('escuelaId').value,
    }
    return saveDocente;
  }
}
