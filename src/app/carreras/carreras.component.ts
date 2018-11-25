import { Component,OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Carrera, Administrador } from '../modelos';
import { Subject } from 'rxjs';
import { AbcService } from '../abc.service';
import { debounceTime } from 'rxjs/operators';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {
  modulo:string='Carreras';
  modal:string;
  carreraForm: FormGroup;
  carrera: Carrera;
  data:Carrera[]=[];
  dataTable: any;
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
  constructor( private pf: FormBuilder,private abc: AbcService,private chRef: ChangeDetectorRef ) { }
  
  public agregar(){
    this.inicializarForm();
    this.modal = 'agregar';
    $("#modal").modal();
  }

  public modificar(idCarrera:number){
    this.abc.getCarrera(idCarrera)
    .subscribe((data: any) => {
      this.carreraForm=this.pf.group({
        idCarrera:data.idCarrera,
        descripcion:data.descripcion,
        idEscuela:data.idEscuela,
        estatus:data.estatus 
      });
      this.modal = 'modificar';
      $("#modal").modal();
    }); 
  }

  public obtenerCarreras(){
    this.abc.getCarreras(this.administradorUser.idEscuela)
    .subscribe((data: any) => {
      this.data=data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable();
    });
  }
  public modificarCarrera(carrera:Carrera){
    console.log(JSON.stringify(carrera));
    this.abc.updateCarrera(carrera)
    .subscribe(res => {
        this._success.next('Datos modificados con éxito');
        console.log('actualizado');
        this.obtenerCarreras();
      }, (err) => {
        this._danger.next('A ocurrido un error intentalo de nuevo');
        console.log(err);
      }
    );
  }
  public status(idCarrera:number,estatus:number){
    this.abc.getCarrera(idCarrera)
    .subscribe((data: any) => {
      this.carrera=data;
      if (estatus == 0)
        this.carrera.estatus=1;
      else
        this.carrera.estatus=0;
      this.modificarCarrera(this.carrera); 
    }); 
  }

  

  ngOnInit(): void {
    this.idUsuario=localStorage.getItem('idUsuario');
    this.abc.getAdministrador_Usuario(this.idUsuario).subscribe((data: any) => {
      this.administradorUser=data;
      this.obtenerCarreras();
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
    this.carrera = this.saveCarrera();
    console.log(this.carrera);
    if (this.modal=='modificar'){
      this.abc.updateCarrera(this.carrera).subscribe(res => {
        this.obtenerCarreras();
        $("#modal").modal('hide');
        this._success.next('Datos modificados con éxito');
      }, (err) => {
        console.log(err);
        this._danger.next('A ocurrido un error intentalo de nuevo');
      }
     );
    }else{
      this.abc.insertCarrera(this.carrera).subscribe(res => {
        this.obtenerCarreras();
        $("#modal").modal('hide');
        this._success.next('Datos guardados con éxito');
      }, (err) => {
        console.log(err);
        this._danger.next('A ocurrido un error intentalo de nuevo');
      }
     );
    }
  }
  public saveCarrera(){
    const saveCarrera ={
        idCarrera: this.carreraForm.get('idCarrera').value,
        descripcion: this.carreraForm.get('descripcion').value, 
        idEscuela: this.administradorUser.idEscuela,
        estatus: this.carreraForm.get('estatus').value, 
    }
    return saveCarrera;
  }
  public inicializarForm(){
    this.carreraForm = this.pf.group({
      idCarrera: [''],
      descripcion: ['',[Validators.required]],
      idEscuela:[''],
      estatus:[0]      
    });
   }
}
