import { Component,OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Asignatura } from '../modelos';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.css']
})
export class AsignaturasComponent implements OnInit {
  modulo:string='Asignaturas';
  modal:string;
  dataModel:any[] = ['101','102','103']
  asignaturaForm: FormGroup;
  asignatura: Asignatura;
  
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
    this.asignaturaForm = this.pf.group({
      nombre:['',[ Validators.required]],
      creditos:['',[ Validators.required]],
      idMateria:[''],
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
    this.asignatura = this.saveAsignatura();
  }
  saveAsignatura(){
    const saveAsignatura={
      idMateria: this.asignaturaForm.get('idMateria').value,
      nombre: this.asignaturaForm.get('nombre').value,
      creditos: this.asignaturaForm.get('creditos').value,
    };
    return saveAsignatura;
  }

}

