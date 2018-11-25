import { Component,OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Carrera } from '../modelos';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {
  modulo:string='Carreras';
  modal:string;
  carreraForm: FormGroup;
  carrera: Carrera;
  dtOptions: DataTables.Settings = {};
  data: any[]=[
    { descripcion:"Acosta"},
    
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
    this.carrera = this.saveCarrera();
  }
  public saveCarrera(){
    const saveCarrera ={
        idCarrera: this.carreraForm.get('idCarrera').value,
        descripcion: this.carreraForm.get('descripcion').value,   
    }
    return saveCarrera;
  }
  public inicializarForm(){
    this.carreraForm = this.pf.group({
      idCarrera: [''],
      descripcion: ['',[Validators.required]],
      
    });
   }
}
