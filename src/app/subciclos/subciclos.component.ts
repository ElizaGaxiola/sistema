import { Component, OnDestroy,OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Subciclo } from '../modelos';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-subciclos',
  templateUrl: './subciclos.component.html',
  styleUrls: ['./subciclos.component.css']
})
export class SubciclosComponent implements OnInit {
  modulo:string='Subciclos';
  modal:string;
  subcicloForm: FormGroup;
  subciclo: Subciclo;
  idCiclo:any;
  cicloSelect: any[]=[];
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
    this.subciclo = this.saveSubciclo();
  }
  public saveSubciclo(){
    const saveSubciclo ={
        idCiclo: this.subcicloForm.get('idCiclo').value,
        idSubCiclo: this.subcicloForm.get('idSubCiclo').value,
        descripcion: this.subcicloForm.get('descripcion').value,
        fechaFin: this.subcicloForm.get('fechaFin').value,
        fechaIni: this.subcicloForm.get('fechaIni').value, 
    }
    return saveSubciclo;
  }
  public inicializarForm(){
    this.subcicloForm = this.pf.group({
      idCiclo: [''],
      idSubCiclo: ['1'],
      descripcion: ['',[Validators.required]],
      fechaFin: ['',[Validators.required]],
      fechaIni: ['',[Validators.required]],
    });
   }

}
