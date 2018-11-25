import { Component, OnDestroy, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Grupo } from '../modelos';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-creargrupos',
  templateUrl: './creargrupos.component.html',
  styleUrls: ['./creargrupos.component.css']
})
export class CreargruposComponent implements OnInit {
  modulo:string='Grupos'
  modal:string;;
  grupoForm: FormGroup;
  grupo: Grupo;
  idCarrera:any;
  carreraSelect: any[]=[];
  idCiclo:any;
  cicloSelect: any[]=[];
  idDocente:any;
  docenteSelect: any[]=[];
  idGrupoAnt:any;
  grupoantSelect: any[]=[];
  idMateria:any;
  asignaturaSelect: any[]=[];
  idPeriodo:any;
  periodoSelect: any[]=[];
  idSeccion:any;
  seccionSelect: any[]=[];
  idSubCiclo:any;
  subcicloSelect: any[]=[];
  dataModel:any[] = ['101','102','103']
  dtOptions: DataTables.Settings = {};
  data: any[]=[
    { ciclo:"Acosta", seccion:"07/08/2018", carrera:"07/07/2019"},
    
  ];
  constructor( private pf: FormBuilder) { }

  public agregar(){
    this.inicializarForm();
    this.modal = 'agregar';
    $("#modal-modificar").modal();
  }
  public onSubmit(){
    this.grupo = this.saveGroup();
  }
  public inicializarForm(){
    this.grupoForm = this.pf.group({
      idEscuela: [''],
      idSeccion: ['',[ Validators.required]],
      clave: ['',[ Validators.required]],
      nombre: ['',[ Validators.required]],
      idMunicipio: ['',[ Validators.required]],
      colonia:['',[ Validators.required]],
      calle: ['',[ Validators.required]],
      cp: ['',[ Validators.required]],
      numero: ['',[ Validators.required]],
      email:['',[ Validators.required, Validators.email]],
      telefono: ['',[ Validators.required]],
      estatus: [''],
    });
   }
  public saveGroup(){
    const saveGupo ={
        idCarrera: this.grupoForm.get('idCarrera').value,
        idSeccion: this.grupoForm.get('idSeccion').value,
        idCiclo: this.grupoForm.get('idCiclo').value,
        idGrupo: this.grupoForm.get('idGrupo').value,
        idDocente: this.grupoForm.get('idDocente').value,
        idGrupoAnt: this.grupoForm.get('idGrupoAnt').value,
        idMateria: this.grupoForm.get('idMateria').value,
        idPeriodo: this.grupoForm.get('idPeriodo').value,
        idSubCiclo: this.grupoForm.get('idSubCiclo').value,
    }
    return saveGupo;
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


}
