import { Component,OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Asignatura, Administrador } from '../modelos';
import { AbcService } from '../abc.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
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
  dataTable: any;
  data: Asignatura[]=[];
  asignaturaForm: FormGroup;
  asignatura: Asignatura;
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
  constructor(private pf: FormBuilder,private abc: AbcService,private chRef: ChangeDetectorRef) { }

  public agregar(){
    this.inicializarForm();
    this.modal = 'agregar';
    $("#modal").modal();
  }
  public modificar(idMateria:number){
    this.abc.getAsignatura(idMateria)
    .subscribe((data: any) => {
      this.asignaturaForm=this.pf.group({
        idMateria:data.idMateria,
        nombre:data.nombre,
        creditos:data.creditos,
        idEscuela:data.idEscuela 
      });
      this.modal = 'modificar';
      $("#modal").modal();
    }); 
  }
  public obtenerAsignaturas(){
    this.abc.getAsignaturas(this.administradorUser.idEscuela)
    .subscribe((data: any) => {
      this.data=data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable();
    });
  }
  public inicializarForm(){
    this.asignaturaForm = this.pf.group({
      nombre:['',[ Validators.required]],
      creditos:['',[ Validators.required]],
      idMateria:[''],
      idEscuela:['']
    });
   }
  ngOnInit(): void {
    this.idUsuario=localStorage.getItem('idUsuario');
    this.abc.getAdministrador_Usuario(this.idUsuario).subscribe((data: any) => {
      this.administradorUser=data;
      this.obtenerAsignaturas();
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
    this.asignatura = this.saveAsignatura();
    console.log(this.asignatura);
      if (this.modal=='modificar'){
        this.abc.updateAsignatura(this.asignatura).subscribe(res => {
          this.obtenerAsignaturas();
          $("#modal").modal('hide');
          this._success.next('Datos modificados con éxito');
        }, (err) => {
          console.log(err);
          this._danger.next('A ocurrido un error intentalo de nuevo');
        }
       );
      }else{
        this.abc.insertAsignatura(this.asignatura).subscribe(res => {
          this.obtenerAsignaturas();
          $("#modal").modal('hide');
          this._success.next('Datos guardados con éxito');
        }, (err) => {
          console.log(err);
          this._danger.next('A ocurrido un error intentalo de nuevo');
        }
       );
      }
  }
  saveAsignatura(){
    const saveAsignatura={
      idMateria: this.asignaturaForm.get('idMateria').value,
      nombre: this.asignaturaForm.get('nombre').value,
      creditos: this.asignaturaForm.get('creditos').value,
      idEscuela:this.administradorUser.idEscuela
    };
    return saveAsignatura;
  }

}

