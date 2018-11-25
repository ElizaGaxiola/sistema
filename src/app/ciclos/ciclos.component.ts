import { Component,OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Ciclo, Administrador, Escuela } from '../modelos';
import { Subject } from 'rxjs';
import { AbcService } from '../abc.service';
import { debounceTime } from 'rxjs/operators';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-ciclos',
  templateUrl: './ciclos.component.html',
  styleUrls: ['./ciclos.component.css']
})
export class CiclosComponent implements OnInit {
  bsValueFin:any;
  fecha:any;
  bsValueIni:any;
  modulo:string='Ciclos';
  modal:string;
  cicloForm: FormGroup;
  ciclo: Ciclo;
  dtOptions: DataTables.Settings = {};
  dataTable: any;
  data: Ciclo[]=[];
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
  constructor( private pf: FormBuilder,private abc: AbcService,private chRef: ChangeDetectorRef) { }
  
  public agregar(){
    this.inicializarForm();
    this.modal = 'agregar';
    $("#modal").modal();
  }
  public modificar(idCiclo:number){
    this.abc.getCiclo(idCiclo)
    .subscribe((data: any) => {
      this.fecha=data.fechaIni.split('-');
      this.bsValueIni=new Date(this.fecha[0],this.fecha[1]-1,this.fecha[2]);
      this.fecha=data.fechaFin.split('-');
      this.bsValueFin=new Date(this.fecha[0],this.fecha[1]-1,this.fecha[2]);
      this.cicloForm=this.pf.group({
        idCiclo: data.idCiclo,
        descripcion: data.descripcion,
        fechaFin: data.fechaFin,
        fechaIni: data.fechaIni,
        idEscuela: data.idEscuela
      });
      this.modal = 'modificar';
      $("#modal").modal();
    }); 
  }
  public obtenerCiclos(){
    this.abc.getCiclos(this.administradorUser.idEscuela)
    .subscribe((data: any) => {
      this.data=data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable();
      console.log(data);
    });
  }
  ngOnInit(): void {
    this.idUsuario=localStorage.getItem('idUsuario');
    this.abc.getAdministrador_Usuario(this.idUsuario).subscribe((data: any) => {
      this.administradorUser=data;
      this.obtenerCiclos();
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
    this.ciclo = this.saveCiclo();
    console.log(this.ciclo);
    if (this.modal=='modificar'){
      this.abc.updateCiclo(this.ciclo).subscribe(res => {
        this.obtenerCiclos();
        $("#modal").modal('hide');
        this._success.next('Datos guardados con éxito');
      }, (err) => {
        console.log(err);
        this._danger.next('A ocurrido un error intentalo de nuevo');
      }
     );
    }else{
      this.abc.insertCiclo(this.ciclo).subscribe(res => {
        this.obtenerCiclos();
        $("#modal").modal('hide');
        this._success.next('Datos modificados con éxito');
      }, (err) => {
        console.log(err);
        this._danger.next('A ocurrido un error intentalo de nuevo');
      }
     );
    }
  }
  public saveCiclo(){
    const saveCiclo ={
        idCiclo: this.cicloForm.get('idCiclo').value,
        descripcion: this.cicloForm.get('descripcion').value,
        fechaFin: this.cicloForm.get('fechaFin').value,
        fechaIni: this.cicloForm.get('fechaIni').value,
        idEscuela: this.administradorUser.idEscuela, 
    }
    return saveCiclo;
  }
  public inicializarForm(){
    this.cicloForm = this.pf.group({
      idCiclo: [''],
      descripcion: ['',[Validators.required]],
      fechaFin: ['',[Validators.required]],
      fechaIni: ['',[Validators.required]],
      idEscuela: [''],
    });
   }

}
