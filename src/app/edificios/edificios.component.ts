import { Component,OnDestroy, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AbcService } from '../abc.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Edificio, Administrador } from '../modelos';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-edificios',
  templateUrl: './edificios.component.html',
  styleUrls: ['./edificios.component.css']
})
export class EdificiosComponent implements OnInit {
  modulo:string='Edificios';
  dtOptions: DataTables.Settings = {};
  data: Edificio[]=[];
  modal:string;
  edificioForm:FormGroup;
  edificio: Edificio;
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
  constructor(private pf: FormBuilder,private abc: AbcService) { }

  public agregar(){
    this.inicializarForm();
    this.modal = 'agregar';
    $("#modal").modal();
  }
  public modificar(idEdificio:number){
    this.abc.getEdificio(idEdificio)
    .subscribe((data: any) => {
      this.edificioForm=this.pf.group({
        idEdificio:data.idEdificio,
        descripcion:data.descripcion,
        idEscuela:data.idEscuela,
        estatus:data.estatus 
      });
      this.modal = 'modificar';
      $("#modal").modal();
    }); 
  }
  
  public saveEdificio(){
    const saveEdificio ={
        idEdificio: this.edificioForm.get('idEdificio').value,
        descripcion: this.edificioForm.get('descripcion').value,
        idEscuela: this.administradorUser.idEscuela,
        estatus: this.edificioForm.get('estatus').value, 
    }
    return saveEdificio;
  }
  public inicializarForm(){
    this.edificioForm = this.pf.group({
      idEdificio: [''],
      descripcion: ['',[Validators.required]],
      idEscuela: [this.administradorUser.idEscuela],
      estatus: [''],
    });
   }

  ngOnInit(): void {
    this.idUsuario=localStorage.getItem('idUsuario');
    this.abc.getAdministrador_Usuario(this.idUsuario).subscribe((data: any) => {
      this.administradorUser=data;
      this.obtenerEdificios();
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
    this.dtOptions = {
      language: {
        "emptyTable": "Sin resultados encontrados",
        "info": " _START_ - _END_ / _TOTAL_ ",
        "infoEmpty": "0-0 /0",
        "infoFiltered": "",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "Mostrar _MENU_ registros",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "search": "<i class='fas fa-search'></i>",
        "zeroRecords": "Sin resultados encontrados",
        "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "Siguiente",
            "previous": "Anterior"
        }
      }
    };
  }

  obtenerEdificios(){
    this.abc.getEdificios(this.administradorUser.idEscuela)
    .subscribe((data: any) => {
      this.data=data;
      console.log(data);
    });
  }
  public onSubmit(){
    this.edificio = this.saveEdificio();
    console.log(this.edificio);
      if (this.modal=='modificar'){
        this.abc.updateEdificio(this.edificio).subscribe(res => {
          this.obtenerEdificios();
          $("#modal").modal('hide');
          this._success.next('Datos modificados con éxito');
        }, (err) => {
          console.log(err);
          this._danger.next('A ocurrido un error intentalo de nuevo');
        }
       );
      }else{
        this.abc.insertEdificio(this.edificio).subscribe(res => {
          this.obtenerEdificios();
          $("#modal").modal('hide');
          this._success.next('Datos guardados con éxito');
        }, (err) => {
          console.log(err);
          this._danger.next('A ocurrido un error intentalo de nuevo');
        }
       );
      }
  }
  public modificarEdificio(edificio:Edificio){
    console.log(JSON.stringify(edificio));
    this.abc.updateEdificio(edificio)
    .subscribe(res => {
        this._success.next('Datos modificados con éxito');
        console.log('actualizado');
        this.obtenerEdificios();
      }, (err) => {
        this._danger.next('A ocurrido un error intentalo de nuevo');
        console.log(err);
      }
    );
  }
  public status(idEdificio:number,estatus:number){
    this.abc.getEdificio(idEdificio)
    .subscribe((data: any) => {
      this.edificio=data;
      if (estatus == 0)
        this.edificio.estatus=1;
      else
        this.edificio.estatus=0;
      this.modificarEdificio(this.edificio); 
    }); 
  }

}
