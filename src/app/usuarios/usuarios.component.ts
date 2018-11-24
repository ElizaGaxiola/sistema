import { Component, OnDestroy, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Escuela,Administrador} from '../modelos';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AbcService } from '../abc.service';

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
  dtOptions: DataTables.Settings = {};
  data: Administrador[]=[];
  administrador:Administrador;
  escuelasSelect: any[]=[];
  modal:string;
    
  constructor(private abc: AbcService, private pf: FormBuilder) {
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
        $("#modal-modificar").modal('hide');
      }, (err) => {
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
      console.log(data);
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
        console.log('actualizado');
        this.obtenerAdministradores();
      }, (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
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
