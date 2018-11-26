import { Component,OnDestroy, OnInit } from '@angular/core';
import { AbcService } from '../abc.service';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Periodo } from '../modelos';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-periodos',
  templateUrl: './periodos.component.html',
  styleUrls: ['./periodos.component.css']
})
export class PeriodosComponent implements OnInit {
modulo:string='Periodos por Sección';
periodoForm:FormGroup;
periodo: Periodo;
modal:string;
idSeccion:any;
seccionesSelect: any[]=[];
idCarrera:any;
carreraSelect: any[]=[];
dataModel:any[] = ['101','102','103']
  dtOptions: DataTables.Settings = {};
  data: any[]=[
    { descripcion:"Acosta", seccion:"07/08/2018", carrera:"07/07/2019"},
    
  ];
  constructor( private pf: FormBuilder) { }

  public agregar(){
    this.inicializarForm();
    this.modal = 'agregar';
    $("#modal-modificar").modal();
  }
  public onSubmit(){
    this.periodo = this.savePeriodo();
  }

  public savePeriodo(){
    const savePeriodo ={
        idSeccion: this.periodoForm.get('idSeccion').value,
        idCarrera: this.periodoForm.get('idCarrera').value,
        idPeriodo: this.periodoForm.get('idPeriodo').value,
        descripcion: this.periodoForm.get('descripcion').value,
    }
    return savePeriodo;
  }

  public inicializarForm(){
    this.periodoForm = this.pf.group({
      idSeccion: ['',[ Validators.required]],
      idCarrera: ['',[ Validators.required]],
      descripcion: ['',[ Validators.required]],
      idPeriodo: [''],
    });
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
