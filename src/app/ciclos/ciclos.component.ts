import { Component,OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Ciclo } from '../modelos';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-ciclos',
  templateUrl: './ciclos.component.html',
  styleUrls: ['./ciclos.component.css']
})
export class CiclosComponent implements OnInit {
  modulo:string='Ciclos';
  modal:string;
  cicloForm: FormGroup;
  ciclo: Ciclo;
  dtOptions: DataTables.Settings = {};
  data: any[]=[
    { descripcion:"Acosta", fechain:"07/08/2018", fechafin:"07/07/2019"},
    
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
    this.ciclo = this.saveCiclo();
  }
  public saveCiclo(){
    const saveCiclo ={
        idCiclo: this.cicloForm.get('idCiclo').value,
        idSubCiclo: this.cicloForm.get('idSubCiclo').value,
        descripcion: this.cicloForm.get('descripcion').value,
        fechaFin: this.cicloForm.get('fechaFin').value,
        fechaIni: this.cicloForm.get('fechaIni').value, 
    }
    return saveCiclo;
  }
  public inicializarForm(){
    this.cicloForm = this.pf.group({
      idCiclo: [''],
      idSubCiclo: ['1'],
      descripcion: ['',[Validators.required]],
      fechaFin: ['',[Validators.required]],
      fechaIni: ['',[Validators.required]],
    });
   }

}
