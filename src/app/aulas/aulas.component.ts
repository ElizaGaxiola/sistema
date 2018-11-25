import { Component,OnDestroy, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Aula} from '../modelos';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-aulas',
  templateUrl: './aulas.component.html',
  styleUrls: ['./aulas.component.css']
})
export class AulasComponent implements OnInit {
  modulo:string='Aulas';
  modal:string;
  aulaForm:FormGroup;
  aula: Aula;
  idEdificio:any;
  edificioSelect: any[]=[];
  dtOptions: DataTables.Settings = {};
  data: any[]=[
    { descripcion: " se encuentra", edificio:"1"},
    
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
  public saveAula(){
    const saveAula ={
        idAula: this.aulaForm.get('idEscuela').value,
        idEdificio: this.aulaForm.get('idEscuela').value,
        descripcion: this.aulaForm.get('idEscuela').value,
        estatus: this.aulaForm.get('idEscuela').value,
    }
    return saveAula;
  }
  public inicializarForm(){
    this.aulaForm = this.pf.group({
      idAula: [''],
      idedificio: ['',[Validators.required]],
      descripcion: ['',[Validators.required]],
      estatus: [''],
    });
   }

}
