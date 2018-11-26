import { Component,OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { AsignaturaPeriodo } from '../modelos';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-asignaturasxperiodos',
  templateUrl: './asignaturasxperiodos.component.html',
  styleUrls: ['./asignaturasxperiodos.component.css']
})
export class AsignaturasxperiodosComponent implements OnInit {
  modulo:string='Asignaturas Por Periodo';
  modal:string;
  periodoSelect:any[]=[];
  idPeriodo: any;
  asignaturaSelect:any[]=[];
  idMateria: any;
  carreraSelect:any[]=[];
  idCarrera:any;
  seccionSelect:any[]=[];
  idSeccion:any;
  dataModel:any[] = ['101','102','103']
  asignaturaPeriodoForm: FormGroup;
  asignaturaPeriodo: AsignaturaPeriodo;
  
  dtOptions: DataTables.Settings = {};
  data: any[]=[
    { nombre: "1", creditos:"Acosta"},
    
  ];
  constructor(private pf: FormBuilder) { }

  public agregar(){
    this.inicializarForm();
    this.modal = 'agregar';
    $("#modal-modificar").modal();
  }
  
  public inicializarForm(){
    this.asignaturaPeriodoForm = this.pf.group({
      idMateria:['',[Validators.required]],
      idCarrera: ['',[Validators.required]],
      idSeccion: ['',[Validators.required]],
      year: ['',[Validators.required]],
      idPeriodo: ['',[Validators.required]],
      creditos:['1'],
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
 
  onSubmit(){
    this.asignaturaPeriodo = this.saveAsignaturaPeriodo();
  }
  saveAsignaturaPeriodo(){
    const saveAsignaturaPeriodo={
      idMateria: this.asignaturaPeriodoForm.get('idMateria').value,
      idCarrera: this.asignaturaPeriodoForm.get('idCarrera').value,
      idSeccion: this.asignaturaPeriodoForm.get('idSeccion').value,
      year: this.asignaturaPeriodoForm.get('year').value,
      idPeriodo: this.asignaturaPeriodoForm.get('idPeriodo').value,
      creditos: this.asignaturaPeriodoForm.get('creditos').value,
    };
    return saveAsignaturaPeriodo;
  }

}
