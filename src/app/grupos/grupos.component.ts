import { Component,OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AbcService } from '../abc.service';
import { ActivatedRoute } from '@angular/router';
import { Grupo, calificacion } from '../modelos';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements  OnInit {
  modulo:string="Grupos";
  idGrupo:number;
  grupo:Grupo;
  clave:string='';
  ciclo:string='';
  materia:string='';
  cali:boolean=false;
  dtOptions: DataTables.Settings = {};
  //datos para datatable
  data: any[]=[];
  select: any[]=[
    {id: 1, name: '1'},
    {id: 2, name: '2'},
    {id: 3, name: '3'},
    {id: 4, name: '4'},
    {id: 5, name: '5'},
    {id: 6, name: '6'},
    {id: 7, name: '7'},
    {id: 8, name: '8'},
    {id: 9, name: '9'},
    {id: 10, name: '10'}
  ];
  acta:any;
  calificacionForm:FormGroup;
  calificacion: calificacion;
  idAlumno:number;
  alumno:any;
  nombreAlu:string='';
  successMessage: string;
  dangerMessage: string;
  private _success = new Subject<string>();
  private _danger = new Subject<string>();
  staticAlertClosed = false;
  constructor(private pf: FormBuilder,private _route: ActivatedRoute,private abc: AbcService,private chRef: ChangeDetectorRef) { 
    console.log(this._route.snapshot.paramMap.get('id'));
    this.idGrupo = Number(this._route.snapshot.paramMap.get('id'));
    this.abc.getGrupo(this.idGrupo)
    .subscribe((data: any) => {
      console.log(data);
      this.grupo=data;
      this.clave=data.clave;
      this.abc.getActa(data.idSeccion,data.idPeriodo,data.idCarrera).subscribe((acta:any)=>{
        if(acta.status == false){
          this.cali=false;
        }else{
          this.cali=true;
          this.acta=acta;
          console.log(acta);
        }
        console.log(data);
        console.log(this.cali);
      });
      this.abc.getCiclo(data.idCiclo).subscribe((ciclo:any)=>{
        this.ciclo=ciclo.descripcion;
        console.log(this.ciclo);
      });
      this.abc.getAsignatura(data.idMateria).subscribe((asignatura:any)=>{
        this.materia=asignatura.nombre;
        console.log(this.materia);
      });
    }); 
    this.obtenerAlumnos();
  }
  public obtenerAlumnos(){
    this.abc.getAlumnosxGrupo(this.idGrupo)
    .subscribe((data: any) => {
      console.log(data);
      console.log('data');
      this.data=data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      table.DataTable();
    });
  }
  public calificar(idAlumno:number){
    this.idAlumno=idAlumno;
    this.abc.getAlumno(idAlumno).subscribe((data:any)=>{
      console.log(data);
      this.alumno=data;
      this.nombreAlu=data.nombre+' '+data.apellidoP+' '+data.apellidoM;
    });
    $("#modal").modal();
  }
  ngOnInit(): void {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
    this._danger.subscribe((message) => this.dangerMessage = message);
    this._danger.pipe(
      debounceTime(5000)
    ).subscribe(() => this.dangerMessage = null);
      this.calificacionForm = this.pf.group({
        idConfCalificacion:[''],
        idAlumno:[''],
        calificacion:['',[Validators.required]],
        idGrupo:['']
      });
  }

  public saveCalificacion(){
    const saveCalificacion ={
        idConfCalificacion: this.acta.idConfCalificacion,
        idAlumno: this.idAlumno,
        calificacion: this.calificacionForm.get('calificacion').value,
        idGrupo: this.grupo.idGrupo
    }
    return saveCalificacion;
  }
  public onSubmit(){
    this.calificacion = this.saveCalificacion();
    console.log(this.calificacion);
    this.abc.insertCalificacion(this.calificacion).subscribe(res => {
      $("#modal").modal('hide');
      if(res.status==true){
        this._success.next(res.msg);
      }
    }, (err) => {
      console.log(err);
      this._danger.next('A ocurrido un error intentalo de nuevo');
    }
   );
  }

}
