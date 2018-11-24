import { Component,OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.css']
})
export class AvisosComponent implements OnInit {
  modulo:string='Avisos';
   //configuración para select
 config = {
  multiple:false,
  //value:la variable de modelo en la que desea guardar las opciones seleccionadas.
  displayKey:"description", 
  search:true 
}
dataModel:any[] = ['101','102','103']
avisoForm: FormGroup;
aviso: any;
  
  dtOptions: DataTables.Settings = {};
  data: any[]=[
    { titulo: "1", fechaIni:"Acosta",  fechaFin:"Acosta"},
    
  ];
  constructor(private pf: FormBuilder) { }
  public agregar(){
 
    $("#modal-agregar").modal();
  }
  public modificar(){
    
    $("#modal-modificar").modal();
  }
  public asignar(){
    
    $("#modal-asignar").modal();
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
    this.avisoForm=this.pf.group({
      nombre:['',[ Validators.required]],
      
    });
  }
 
  onSubmit(){
    this.aviso = this.saveAviso();
  }
  saveAviso(){
    const saveAviso={
      nombre: this.avisoForm.get('nombre').value,
  
    };
    return saveAviso;
  }

  
}
