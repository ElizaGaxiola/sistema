import { Component,OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { AbcService } from '../abc.service';
import { Http, Response } from '@angular/http';
import {Escuela} from '../modelos';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-escuelas',
  templateUrl: './escuelas.component.html',
  styleUrls: ['./escuelas.component.css']
})
export class EscuelasComponent implements OnInit {
  escuelaForm:FormGroup;
  modulo:string='Escuelas';
  modal:string;
  dataTable: any;
  data: Escuela[]=[];
  escuela: Escuela;
  seccionesSelect: any[]=[];
  idEstado:any;
  estadosSelect: any[]=[];
  idMunicipio:any;
  municipiosSelect: any[]=[];
  successMessage: string;
  dangerMessage: string;
  private _success = new Subject<string>();
  private _danger = new Subject<string>();
  staticAlertClosed = false;

  constructor(private abc: AbcService, private pf: FormBuilder,private chRef: ChangeDetectorRef) { 
    this.obtenerEscuelas();
    this.abc.getSecciones().subscribe((data: any) => {
      for (let seccion of data) {
        this.seccionesSelect = [...this.seccionesSelect, {id: seccion.idSeccion, name: seccion.descripcion}];
      }
     });
    this.abc.getEstados().subscribe((data: any) => {
      for (let estado of data) {
        this.estadosSelect = [...this.estadosSelect, {id: estado.idEstado, name: estado.nombre}];
      }
    });
  }
  public change(){
    console.log(this.idEstado);
    this.abc.getMunicipioEdo(this.idEstado).subscribe((data: any) => {
       this.municipiosSelect=[];
       if (data != null){
        for (let municipio of data) {
          this.municipiosSelect = [...this.municipiosSelect, {id: municipio.idMunicipio, name: municipio.nombre}];
        }
       }
    });
  }
  public agregar(){
    this.inicializarForm();
    this.modal = 'agregar';
    $("#modal-modificar").modal();
  }
  public onSubmit(){
    this.escuela = this.saveEscuela();
    console.log(this.escuela);
    if (this.modal=='modificar'){
      this.abc.updateEscuela(this.escuela).subscribe(res => {
        this.obtenerEscuelas();
        $("#modal-modificar").modal('hide');
        this._success.next('Datos guardados con éxito');
      }, (err) => {
        console.log(err);
        this._danger.next('A ocurrido un error intentalo de nuevo');
      }
     );
    }else{
      this.abc.insertEscuela(this.escuela).subscribe(res => {
        this.obtenerEscuelas();
        $("#modal-modificar").modal('hide');
        this._success.next('Datos modificados con éxito');
      }, (err) => {
        console.log(err);
        this._danger.next('A ocurrido un error intentalo de nuevo');
      }
     );
    }
  }
  public saveEscuela(){
    const saveEscuela ={
        idEscuela: this.escuelaForm.get('idEscuela').value,
        idSeccion: this.escuelaForm.get('idSeccion').value,
        clave: this.escuelaForm.get('clave').value,
        nombre: this.escuelaForm.get('nombre').value,
        idMunicipio: this.escuelaForm.get('idMunicipio').value,
        colonia: this.escuelaForm.get('colonia').value,
        calle: this.escuelaForm.get('calle').value,
        cp: this.escuelaForm.get('cp').value,
        numero: this.escuelaForm.get('numero').value,
        email: this.escuelaForm.get('email').value,
        telefono: this.escuelaForm.get('telefono').value,
        estatus: this.escuelaForm.get('estatus').value
    }
    return saveEscuela;
  }
  public modificar(clave:string){
    this.abc.getEscuela(clave)
    .subscribe((data: any) => {
      this.abc.getMunicipio(data.idMunicipio).subscribe((data: any) => {
        this.idEstado=data.idEstado;
        this.change();
      });
      this.escuelaForm=this.pf.group({
        idEscuela: data.idEscuela,
        idSeccion: data.idSeccion,
        clave: data.clave,
        nombre: data.nombre,
        idMunicipio: data.idMunicipio,
        colonia: data.colonia,
        calle: data.calle,
        cp: data.cp,
        numero: data.numero,
        email:data.email,
        telefono: data.telefono,
        estatus: data.estatus
      });
      this.modal = 'modificar';
      $("#modal-modificar").modal();
    }); 
  }
  public obtenerEscuelas(){
    this.abc.getEscuelas()
    .subscribe((data: any) => {
      this.data=data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable();
    });
  }
  public obtenerEscuela(clave:string){
    this.abc.getEscuela(clave)
    .subscribe((data: any) => {
      this.escuela=data;
    });
  }
  public modificarEscuela(escuela:Escuela){
    console.log(JSON.stringify(escuela));
    this.abc.updateEscuela(escuela)
    .subscribe(res => {
        this._success.next('Datos modificados con éxito');
        console.log('actualizado');
        this.obtenerEscuelas();
      }, (err) => {
        this._danger.next('A ocurrido un error intentalo de nuevo');
        console.log(err);
      }
    );
  }
  public status(clave:string,estatus:number){
    this.abc.getEscuela(clave)
    .subscribe((data: any) => {
      this.escuela=data;
      if (estatus == 0)
        this.escuela.estatus=1;
      else
        this.escuela.estatus=0;
      this.modificarEscuela(this.escuela); 
    }); 
  }
  public inicializarForm(){
    this.escuelaForm = this.pf.group({
      idEscuela: [''],
      idSeccion: ['',[ Validators.required]],
      clave: ['',[ Validators.required]],
      nombre: ['',[ Validators.required]],
      idMunicipio: ['',[ Validators.required]],
      colonia:['',[ Validators.required]],
      calle: ['',[ Validators.required]],
      cp: ['',[ Validators.required]],
      numero: ['',[ Validators.required]],
      email:['',[ Validators.required, Validators.email]],
      telefono: ['',[ Validators.required]],
      estatus: [''],
    });
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
    this.inicializarForm();
  }

}
