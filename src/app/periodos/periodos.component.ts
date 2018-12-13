import { Component,OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { AbcService } from '../abc.service';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Periodo, Administrador } from '../modelos';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-periodos',
  templateUrl: './periodos.component.html',
  styleUrls: ['./periodos.component.css']
})
export class PeriodosComponent implements OnInit {
modulo:string='Periodos por Sección';
periodoForm:FormGroup;
periodo: Periodo;
modal:string;
carreraSelect: any[]=[];
data:Periodo[]=[];
datosTable:any[]=[];
dataTable: any;
idUsuario: any;
idSeccion: number;
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
  constructor( private pf: FormBuilder,private abc: AbcService,private chRef: ChangeDetectorRef ) { }

  public agregar(){
    this.inicializarForm();
    this.modal = 'agregar';
    $("#modal").modal();
  }
  public modificar(idPeriodo:number,idSeccion:number,idCarrera:number){
    this.abc.getPeriodo(idPeriodo,idSeccion,idCarrera)
    .subscribe((data: any) => {
      this.periodoForm=this.pf.group({
        idPeriodo:data.idPeriodo,
        idSeccion:data.idSeccion,
        descripcion:data.descripcion,
        idCarrera:data.idCarrera 
      });
      this.modal = 'modificar';
      $("#modal").modal();
    }); 
  }
  public onSubmit(){
    this.periodo = this.savePeriodo();
    console.log(this.periodo);
    if (this.modal=='modificar'){
      this.abc.updatePeriodo(this.periodo).subscribe(res => {
        this.obtenerPeriodos();
        $("#modal").modal('hide');
        this._success.next('Datos modificados con éxito');
      }, (err) => {
        console.log(err);
        this._danger.next('A ocurrido un error intentalo de nuevo');
      }
     );
    }else{
      this.abc.insertPeriodo(this.periodo).subscribe(res => {
        this.obtenerPeriodos();
        $("#modal").modal('hide');
        this._success.next('Datos guardados con éxito');
      }, (err) => {
        console.log(err);
        this._danger.next('A ocurrido un error intentalo de nuevo');
      }
     );
    }
  }

  public savePeriodo(){
    const savePeriodo ={
        idSeccion: this.idSeccion,
        idCarrera: this.periodoForm.get('idCarrera').value,
        idPeriodo: this.periodoForm.get('idPeriodo').value,
        descripcion: this.periodoForm.get('descripcion').value,
    }
    return savePeriodo;
  }

  public inicializarForm(){
    this.periodoForm = this.pf.group({
      idSeccion: [''],
      idCarrera: ['',[ Validators.required]],
      descripcion: ['',[ Validators.required]],
      idPeriodo: [''],
    });
   }
  public obtenerPeriodos(){
    this.datosTable=[];
    this.abc.getPeriodos(this.administradorUser.idEscuela)
    .subscribe((data: any) => {
      this.data=data;
      for (let item of data) {
        this.abc.getCarrera(item.idCarrera).subscribe((carrera: any) =>{
          this.datosTable.push({descripcion:item.descripcion,carrera: carrera.descripcion,idPeriodo:item.idPeriodo,idSeccion:item.idSeccion,idCarrera:item.idCarrera});
          this.chRef.detectChanges();
          // Now you can use jQuery DataTables :
          const table: any = $('table');
          this.dataTable = table.DataTable();
        });
      }
    });
  }
  ngOnInit(): void {
    this.idUsuario=localStorage.getItem('idUsuario');
    this.abc.getAdministrador_Usuario(this.idUsuario).subscribe((data: any) => {
      this.administradorUser=data;
      this.abc.getEscuela_Id(this.administradorUser.idEscuela).subscribe((data:any)=>{
        this.idSeccion=data.idSeccion;
      });
      this.abc.getCarreras(this.administradorUser.idEscuela).subscribe((data: any) => {
        for (let carrera of data) {
          this.carreraSelect = [...this.carreraSelect, {id: carrera.idCarrera, name: carrera.descripcion}];
        }
     });
      this.obtenerPeriodos();
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

}
