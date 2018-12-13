import { Component,OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Aviso, Administrador } from '../modelos';
import { Subject } from 'rxjs';
import { AbcService } from '../abc.service';
import { debounceTime } from 'rxjs/operators';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.css']
})
export class AvisosComponent implements OnInit {
  modulo:string='Avisos';
  avisoForm: FormGroup;
  aviso: Aviso;
  modal: string;
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
  tipos: any[]=[
    {id: 1, name: 'Ultimas noticias'},
    {id: 2, name: 'Proximos exámenes'},
    {id: 3, name: 'Reunión de padres de familia'},
    {id: 4, name: 'Suspención de clases'}
  ];
  successMessage: string;
  dangerMessage: string;
  private _success = new Subject<string>();
  private _danger = new Subject<string>();
  staticAlertClosed = false;
  dataTable: any;
  data: any[]=[];
  datosTable:any[]=[];
  constructor( private abc: AbcService, private pf: FormBuilder,private chRef: ChangeDetectorRef ) { }
  table:any;
  public agregar(){
    this.inicializarForm();
    this.modal = 'agregar';
    $("#modal-modificar").modal();
  }

  public modificar(idAviso:number){
    console.log(idAviso);
    this.abc.getAviso(idAviso)
    .subscribe((data: any) => {
      this.avisoForm=this.pf.group({
        idAviso:data.idAviso,
        titulo: data.titulo,
        mensaje: data.mensaje,
        fechaIni: data.fechaIni,
        fechaFin: data.fechaFin,
        idEscuela:data.idEscuela,
        idTipo: Number(data.idTipo)
      });
      this.modal = 'modificar';
      $("#modal-modificar").modal();
    }); 
  }

  public eliminar(idAviso){
    this.abc.deleteAviso(idAviso).subscribe(RES =>{
      this._success.next('Datos eliminados con éxito');
      this.obtenerAvisos();
    }, (err) => {
      console.log(err);
      this._danger.next('A ocurrido un error intentalo de nuevo');
    }
    );
  }
  
  ngOnInit(): void {
    this.table = $('#table');
    this.idUsuario=localStorage.getItem('idUsuario');
    this.abc.getAdministrador_Usuario(this.idUsuario).subscribe((data: any) => {
      this.administradorUser=data;
      this.obtenerAvisos();
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
    this.aviso = this.saveAviso();
    if (this.modal=='agregar'){
      console.log(this.aviso);
      this.abc.insertAviso(this.aviso).subscribe(res => {
        $("#modal-modificar").modal('hide');
        this.obtenerAvisos();
        this._success.next('Datos guardados con éxito');
      }, (err) => {
        console.log(err);
        this._danger.next('A ocurrido un error intentalo de nuevo');
      }
     );
    }else{
      this.abc.updateAviso(this.aviso).subscribe(res => {
        $("#modal-modificar").modal('hide');
        this.obtenerAvisos();
        this._success.next('Datos modificados con éxito');
      }, (err) => {
        console.log(err);
        this._danger.next('A ocurrido un error intentalo de nuevo');
      }
     );
    }
  }
  public obtenerAvisos(){
    this.datosTable=[];
    console.log(this.datosTable);
    let tipo:string;
    this.abc.getAvisos(this.administradorUser.idEscuela)
    .subscribe((data: any) => {
      console.log(data);
      this.data=data;
      for (let d of data) {
        if (d.idTipo == 1){
          tipo='Ultimas noticias';
        }else if(d.idTipo == 2){
          tipo='Proximos exámenes';
        }else if(d.idTipo == 3){
          tipo='Reunión de padres de familia';
        }else{
          tipo='Suspención de clases';
        }
        this.datosTable = [...this.datosTable, {titulo: d.titulo, fechaIni: d.fechaIni, fechaFin:d.fechaFin,idAviso:d.idAviso,tipo:tipo}];
      }
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable();
    });
  }

  public saveAviso(){
    const saveAviso ={
        idAviso: this.avisoForm.get('idAviso').value,
        titulo: this.avisoForm.get('titulo').value,
        mensaje: this.avisoForm.get('mensaje').value,
        fechaFin: this.avisoForm.get('fechaFin').value,
        fechaIni: this.avisoForm.get('fechaIni').value,
        idEscuela: this.administradorUser.idEscuela,
        idTipo: this.avisoForm.get('idTipo').value
      }
    return saveAviso;
  }

  public inicializarForm(){
    this.avisoForm = this.pf.group({
      idAviso: [''],
      titulo: ['',[Validators.required]],
      mensaje: ['',[Validators.required]],
      fechaIni: ['',[Validators.required]],
      fechaFin: ['',[Validators.required]],
      idEscuela:[],
      idTipo:['',[Validators.required]]
    });
   }

  
}
