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
  public eliminar(idMateria){
    this.abc.deteleAsignaturaPeriodo(idMateria,this.periodo.idSeccion,this.periodo.idPeriodo,this.periodo.idCarrera).subscribe(RES =>{
      this._success.next('Datos guardados con éxito');
      this.change();
    }, (err) => {
      console.log(err);
      this._danger.next('A ocurrido un error intentalo de nuevo');
    }
    );

  }
  public change(){
    this.abc.getAsignaturasPeriodo(this.periodo.idSeccion,this.periodo.idPeriodo,this.periodo.idCarrera)
    .subscribe((data: any) => {
      this.data=data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable();
    });
  }
  public inicializarForm(){
    this.asignaturaPeriodoForm = this.pf.group({
      idMateria:['',[Validators.required]],
      idCarrera: [''],
      idSeccion: [''],
      idPeriodo: ['']
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
      this.abc.getAsignaturas(this.administradorUser.idEscuela)
      .subscribe((data: any) => {
        for (let item of data) {
          this.asignaturaSelect = [...this.asignaturaSelect, {id:item.idMateria, name: item.nombre}];
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
    this.abc.insertAsignaturaPeriodo(this.asignaturaPeriodo).subscribe(res => {
      this.change();
      $("#modal").modal('hide');
      this._success.next('Datos guardados con éxito');
    }, (err) => {
      console.log(err);
      this._danger.next('A ocurrido un error intentalo de nuevo');
    }
   );
  }
  saveAsignaturaPeriodo(){
    const saveAsignaturaPeriodo={
      idMateria: this.asignaturaPeriodoForm.get('idMateria').value,
      idCarrera: this.periodo.idCarrera,
      idSeccion: this.periodo.idSeccion,
      idPeriodo: this.periodo.idPeriodo,
    };
    return saveAsignaturaPeriodo;
  }

}
