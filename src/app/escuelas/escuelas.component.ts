import { Component,OnDestroy, OnInit } from '@angular/core';
import { AbcService } from '../abc.service';
import { Http, Response } from '@angular/http';
import {Escuela, Seccion} from '../modelos';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

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
  dtOptions: DataTables.Settings = {};
  data: Escuela[]=[];
  escuela: Escuela;
  seccionesSelect: any[]=[];
  idEstado:any;
  estadosSelect: any[]=[];
  idMunicipio:any;
  municipiosSelect: any[]=[];

  constructor(private abc: AbcService, private pf: FormBuilder) { 
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
      }, (err) => {
        console.log(err);
      }
     );
    }else{
      this.abc.insertEscuela(this.escuela).subscribe(res => {
        this.obtenerEscuelas();
        $("#modal-modificar").modal('hide');
      }, (err) => {
        console.log(err);
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
        console.log('actualizado');
        this.obtenerEscuelas();
      }, (err) => {
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

}
