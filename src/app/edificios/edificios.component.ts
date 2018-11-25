import { Component,OnDestroy, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AbcService } from '../abc.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Edificio } from '../modelos';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-edificios',
  templateUrl: './edificios.component.html',
  styleUrls: ['./edificios.component.css']
})
export class EdificiosComponent implements OnInit {
  modulo:string='Edificios';
  dtOptions: DataTables.Settings = {};
  data: Edificio[]=[];
  modal:string;
  edificioForm:FormGroup;
  edificio: Edificio;
  constructor(private pf: FormBuilder) { }

  public agregar(){
    this.inicializarForm();
    this.modal = 'agregar';
    $("#modal-modificar").modal();
  }
  public saveAula(){
    const saveAula ={
        idEdificio: this.edificioForm.get('idEdificio').value,
        descripcion: this.edificioForm.get('descripcion').value,
        idEscuela: this.edificioForm.get('idEscuela').value,
        estatus: this.edificioForm.get('estatus').value, 
    }
    return saveAula;
  }
  public inicializarForm(){
    this.edificioForm = this.pf.group({
      idEdificio: [''],
      descripcion: ['',[Validators.required]],
      idEscuela: ['1'],
      estatus: [''],
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
