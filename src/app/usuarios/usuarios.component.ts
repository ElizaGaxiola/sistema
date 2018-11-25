import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Escuela,Administrador} from '../modelos';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AbcService } from '../abc.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  modulo:string='Usuarios';
  administradorForm:FormGroup;
  dataTable: any;
  data: Administrador[]=[];
  administrador:Administrador;
  escuelasSelect: any[]=[];
  modal:string;
  successMessage: string;
  dangerMessage: string;
  private _success = new Subject<string>();
  private _danger = new Subject<string>();
  staticAlertClosed = false;
    
  constructor(private abc: AbcService, private pf: FormBuilder,private chRef: ChangeDetectorRef) {
    this.obtenerAdministradores();
    this.abc.getEscuelas().subscribe((data: any) => {
      for (let escuela of data) {
        this.escuelasSelect = [...this.escuelasSelect, {id: escuela.idEscuela, name: escuela.nombre}];
      }
     });
   }
   public onSubmit(){
    this.administrador = this.saveAdministrador();
    console.log(this.administrador);
    if (this.modal=='modificar'){
      this.abc.updateAdministrador(this.administrador).subscribe(res => {
        this.obtenerAdministradores();
        this._success.next('Datos modificados con éxito');
        $("#modal-modificar").modal('hide');
      }, (err) => {
        this._danger.next('A ocurrido un error intentalo de nuevo');
        console.log(err);
      }
     );
    }else{
      this.abc.insertAdministrador(this.administrador).subscribe(res => {
        this.obtenerAdministradores();
        $("#modal-modificar").modal('hide');
      }, (err) => {
        console.log(err);
      }
     );
    }
  }
  public saveAdministrador(){
    const saveAdministrador ={
        idAdministrador: this.administradorForm.get('idAdministrador').value,
        nombre: this.administradorForm.get('nombre').value,
        apellidoP: this.administradorForm.get('apellidoP').value,
        apellidoM: this.administradorForm.get('apellidoM').value,
        email: this.administradorForm.get('email').value,
        contrasena: this.administradorForm.get('contrasena').value,
        idUsuario: this.administradorForm.get('idUsuario').value,
        idEscuela: this.administradorForm.get('idEscuela').value,
        estatus: this.administradorForm.get('estatus').value,
        imagen: this.administradorForm.get('imagen').value
    }
    return saveAdministrador;
  }
  public agregar(){
    this.inicializarForm();
    this.modal = 'agregar';
    $("#modal-modificar").modal();
  }
  public modificar(idAdministrador:number){
    this.modal = 'modificar';
    this.abc.getAdministrador(idAdministrador).subscribe((data: any) => {
      console.log(data);
      this.administradorForm=this.pf.group({
        idAdministrador: data.idAdministrador,
        nombre: data.nombre,
        apellidoP: data.apellidoP,
        apellidoM: data.apellidoM,
        email: data.email,
        contrasena: data.contrasena,
        idUsuario: data.idUsuario,
        idEscuela: data.idEscuela,
        estatus: data.estatus,
        imagen:data.imagen
      });
      $("#modal-modificar").modal();
    });
    
  }
  public obtenerAdministradores(){
    this.abc.getAdministradores()
    .subscribe((data: any) => {
      this.data=data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable();
    });
  }

  public status(id:number,estatus:number){
    this.abc.getAdministrador(id)
    .subscribe((data: any) => {
      this.administrador=data;
      if (estatus == 0)
        this.administrador.estatus=1;
      else
        this.administrador.estatus=0;
      this.modificarAdministrador(this.administrador); 
    }); 
  }
  public modificarAdministrador(administrador:Administrador){
    console.log(JSON.stringify(administrador));
    this.abc.updateAdministrador(administrador)
    .subscribe(res => {
        this._success.next('Datos modificados con éxito');
        console.log('actualizado');
        this.obtenerAdministradores();
      }, (err) => {
        this._danger.next('A ocurrido un error intentalo de nuevo');
        console.log(err);
      }
    );
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
  public inicializarForm(){
    this.administradorForm = this.pf.group({
      idAdministrador: [''],
      nombre: ['',[ Validators.required]],
      apellidoP: ['',[ Validators.required]],
      apellidoM: ['',[ Validators.required]],
      email: ['',[ Validators.required, Validators.email]],
      contrasena:[''],
      idUsuario: [''],
      idEscuela: ['',[ Validators.required]],
      estatus:[''],
      imagen:['']
    });
   }

}
