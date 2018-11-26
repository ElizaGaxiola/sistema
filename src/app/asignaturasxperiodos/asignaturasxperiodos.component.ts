import { Component,OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { AsignaturaPeriodo, Administrador } from '../modelos';
import { Subject } from 'rxjs';
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
  asignaturaSelect:any[]=[];
  asignaturaPeriodoForm: FormGroup;
  asignaturaPeriodo: AsignaturaPeriodo;
  idUsuario: any;
  administradorUser:Administrador={
    idAdministrador:0,
    nombre:'',
    apellidoP:'',
    apellidoM:'',
    email:'',
    contrasena:'',
    idUsuario:0,
    idEscuela:0,
    estatus:0,
    imagen:''
  };
  successMessage: string;
  dangerMessage: string;
  private _success = new Subject<string>();
  private _danger = new Subject<string>();
  staticAlertClosed = false;
  dtOptions: DataTables.Settings = {};
  data: any[]=[];
  constructor(private pf: FormBuilder) { }

  public agregar(){
    this.inicializarForm();
    this.modal = 'agregar';
    $("#modal").modal();
  }
  
  public inicializarForm(){
    this.asignaturaPeriodoForm = this.pf.group({
      idMateria:['',[Validators.required]],
      idCarrera: ['',[Validators.required]],
      idSeccion: ['',[Validators.required]],
      idPeriodo: ['',[Validators.required]]
    });
   }
  ngOnInit(): void {
    this.inicializarForm();
  }
 
  onSubmit(){
    this.asignaturaPeriodo = this.saveAsignaturaPeriodo();
  }
  saveAsignaturaPeriodo(){
    const saveAsignaturaPeriodo={
      idMateria: this.asignaturaPeriodoForm.get('idMateria').value,
      idCarrera: this.asignaturaPeriodoForm.get('idCarrera').value,
      idSeccion: this.asignaturaPeriodoForm.get('idSeccion').value,
      idPeriodo: this.asignaturaPeriodoForm.get('idPeriodo').value,
    };
    return saveAsignaturaPeriodo;
  }

}
