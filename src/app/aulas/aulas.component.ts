import { Component,OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Aula, Administrador} from '../modelos';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AbcService } from '../abc.service';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-aulas',
  templateUrl: './aulas.component.html',
  styleUrls: ['./aulas.component.css']
})
export class AulasComponent implements OnInit {
  modulo:string='Aulas';
  modal:string;
  aulaForm:FormGroup;
  aula: Aula;
  edificioSelect: any[]=[];
  dataTable: any;
  data: Aula[]=[];
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
  constructor( private pf: FormBuilder,private abc: AbcService,private chRef: ChangeDetectorRef) {   }
  
  public agregar(){
    this.inicializarForm();
    this.modal = 'agregar';
    $("#modal").modal();
  }
  public modificar(idAula:number){
    this.abc.getAula(idAula)
    .subscribe((data: any) => {
      this.aulaForm=this.pf.group({
        idAula: data.idAula,
        idEdificio: data.idEdificio,
        descripcion: data.descripcion,
        estatus: data.estatus,
        edificio: data.edificio
      });
      this.modal = 'modificar';
      $("#modal").modal();
    }); 
  }
  obtenerAulas(){
    this.abc.getAulas(this.administradorUser.idEscuela)
    .subscribe((data: any) => {
      this.data=data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable();

      console.log(data);
    });
  }
  public modificarAula(aula:Aula){
    console.log(JSON.stringify(aula));
    this.abc.updateAula(aula)
    .subscribe(res => {
        this._success.next('Datos modificados con éxito');
        console.log('actualizado');
        this.obtenerAulas();
      }, (err) => {
        this._danger.next('A ocurrido un error intentalo de nuevo');
        console.log(err);
      }
    );
  }
  public status(idAula:number,estatus:number){
    this.abc.getAula(idAula)
    .subscribe((data: any) => {
      this.aula=data;
      if (estatus == 0)
        this.aula.estatus=1;
      else
        this.aula.estatus=0;
      this.modificarAula(this.aula); 
    }); 
  }
  ngOnInit(): void {
    this.idUsuario=localStorage.getItem('idUsuario');
    this.abc.getAdministrador_Usuario(this.idUsuario).subscribe((data: any) => {
      this.administradorUser=data;
      this.obtenerAulas();
      this.abc.getEdificios(this.administradorUser.idEscuela).subscribe((data2: any) => {
        console.log(data2);
        if (data2 != null){
          for (let edificio of data2) {
            this.edificioSelect = [...this.edificioSelect, {id: edificio.idEdificio, name: edificio.descripcion}];
          }
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
  public saveAula(){
    const saveAula ={
        idAula: this.aulaForm.get('idAula').value,
        idEdificio: this.aulaForm.get('idEdificio').value,
        descripcion: this.aulaForm.get('descripcion').value,
        estatus: this.aulaForm.get('estatus').value,
        edificio:this.aulaForm.get('edificio').value
    }
    return saveAula;
  }
  onSubmit(){
    this.aula = this.saveAula();
    console.log(this.aula);
    if (this.modal=='modificar'){
      this.abc.updateAula(this.aula).subscribe(res => {
        this.obtenerAulas();
        $("#modal").modal('hide');
        this._success.next('Datos guardados con éxito');
      }, (err) => {
        console.log(err);
        this._danger.next('A ocurrido un error intentalo de nuevo');
      }
     );
    }else{
      this.abc.insertAula(this.aula).subscribe(res => {
        this.obtenerAulas();
        $("#modal-modificar").modal('hide');
        this._success.next('Datos modificados con éxito');
      }, (err) => {
        console.log(err);
        this._danger.next('A ocurrido un error intentalo de nuevo');
      }
     );
    }
  }
  public inicializarForm(){
    this.aulaForm = this.pf.group({
      idAula: [''],
      idEdificio: ['',[Validators.required]],
      descripcion: ['',[Validators.required]],
      estatus: [''],
      edificio:[''],
    });
   }

}
