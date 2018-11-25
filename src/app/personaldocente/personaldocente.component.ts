import { Component, OnDestroy, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Docente} from '../modelos';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
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
  dataModel:any[] = ['101','102','103']
  dtOptions: DataTables.Settings = {};
  data: any[]=[
    { nombre:"Acosta", app:"07/08/2018", apm:"07/07/2019",correo:"07/07/2019"},
    
  ];
  constructor( private pf: FormBuilder) { }

  public agregar(){
    this.inicializarForm();
    this.modal = 'agregar';
    $("#modal-modificar").modal();
  }

  ngOnInit(): void {
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
      status: [''],
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
        status: this.docenteForm.get('status').value,
        escuelaId: this.docenteForm.get('escuelaId').value,
    }
    return saveDocente;
  }
}
