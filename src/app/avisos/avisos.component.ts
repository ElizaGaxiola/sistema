import { Component,OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Aviso } from '../modelos';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.css']
})
export class AvisosComponent implements OnInit {
  modulo:string='Avisos';
  avisoForm: FormGroup;
  aviso: Aviso;
  modal: string;
  dtOptions: DataTables.Settings = {};
  data: any[]=[
    { titulo: "1", fechaIni:"Acosta",  fechaFin:"Acosta"},
    
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
    this.aviso = this.saveAviso();
  }
  public saveAviso(){
    const saveAviso ={
        idAviso: this.avisoForm.get('idAviso').value,
        titulo: this.avisoForm.get('titulo').value,
        mensaje: this.avisoForm.get('mensaje').value,
        fechaFin: this.avisoForm.get('fechaFin').value,
        fechaIni: this.avisoForm.get('fechaIni').value,
    }
    return saveAviso;
  }
  public inicializarForm(){
    this.avisoForm = this.pf.group({
      idAviso: [''],
      titulo: ['',[Validators.required]],
      mensaje: ['',[Validators.required]],
      fechaIni: ['',[Validators.required]],
      fechaFin: ['',[Validators.required]],
    });
   }

  
}
