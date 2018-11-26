import { Component,OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { AsignaturaPeriodo, Administrador } from '../modelos';
import { Subject } from 'rxjs';
import { AbcService } from '../abc.service';
import { ItemsList } from '@ng-select/ng-select/ng-select/items-list';
import { debounceTime } from 'rxjs/operators';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-asignaturasxperiodos',
  templateUrl: './asignaturasxperiodos.component.html',
  styleUrls: ['./asignaturasxperiodos.component.css']
})
export class AsignaturasxperiodosComponent implements OnInit {
  id:any;
  modulo:string='Asignaturas Por Periodo';
  periodoSelect:any[]=[];
  asignaturaSelect:any[]=[];
  periodo:any;
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
  dataTable: any;
  successMessage: string;
  dangerMessage: string;
  private _success = new Subject<string>();
  private _danger = new Subject<string>();
  staticAlertClosed = false;
  dtOptions: DataTables.Settings = {};
  data: any[]=[];
  constructor(private pf: FormBuilder,private abc: AbcService,private chRef: ChangeDetectorRef) {
   
   }

  public agregar(){
    this.inicializarForm();
    $("#modal").modal();
  }
  public change(){
    console.log(this.periodo.idSeccion);
    console.log(this.periodo.idPeriodo);
    console.log(this.periodo.idCarrera);
    this.abc.getAsignaturasPeriodo(this.periodo.idSeccion,this.periodo.idPeriodo,this.periodo.idCarrera)
    .subscribe((data: any) => {
      this.data=data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable();

      console.log(data);
    });
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
    this.idUsuario=localStorage.getItem('idUsuario');
    this.abc.getAdministrador_Usuario(this.idUsuario).subscribe((data: any) => {
      this.administradorUser=data;
      this.abc.getPeriodos(this.administradorUser.idEscuela)
      .subscribe((data: any) => {
        this.chRef.detectChanges();
        for (let item of data) {
          this.id={idSeccion:item.idSeccion,idPeriodo:item.idPeriodo,idCarrera:item.idCarrera};
          this.periodoSelect = [...this.periodoSelect, {id:this.id, name: item.descripcion}];
        }
      });
    });
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
    this._danger.subscribe((message) => this.dangerMessage = message);
    this._danger.pipe(
      debounceTime(5000)
    ).subscribe(() => this.dangerMessage = null);
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
