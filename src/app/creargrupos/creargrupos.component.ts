import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Grupo, Administrador } from '../modelos';
import { Subject } from 'rxjs';
import { AbcService } from '../abc.service';
import { debounceTime } from 'rxjs/operators';
import { Alert } from 'selenium-webdriver';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-creargrupos',
  templateUrl: './creargrupos.component.html',
  styleUrls: ['./creargrupos.component.css']
})
export class CreargruposComponent implements OnInit {
  modulo:string='Grupos';
  modal:string;
  grupoForm: FormGroup;
  grupo: Grupo;
  cicloSelect: any[]=[];
  idCiclo: number;
  docenteSelect: any[]=[];
  asignaturaSelect: any[]=[];
  periodoSelect: any[]=[];
  periodo:any;
  subcicloSelect: any[]=[];
  data: any[]=[];
  dataTable: any;
  successMessage: string;
  dangerMessage: string;
  private _success = new Subject<string>();
  private _danger = new Subject<string>();
  staticAlertClosed = false;
  idUsuario: any;
  administradorUser:Administrador;
  id: { idSeccion: any; idPeriodo: any; idCarrera: any; };
  grups:Grupo;
  constructor( private abc: AbcService, private pf: FormBuilder,private chRef: ChangeDetectorRef ) { }

  public agregar(){
    this.inicializarForm();
    this.modal="agregar";
    $("#modal").modal();
  }

  public modificar(idGrupo:number){
    this.abc.getGrupo(idGrupo)
    .subscribe((data: any) => {
      console.log(data);
      this.idCiclo=data.idCiclo;
      this.id={idSeccion:data.idSeccion,idPeriodo:data.idPeriodo,idCarrera:data.idCarrera};
      this.periodo=this.id;
      this.changeCiclo();
      this.changePeriodo();
      this.grupoForm=this.pf.group({
        idGrupo: data.idGrupo,
        clave: data.clave,
        idCiclo: data.idCiclo,
        idSubCiclo: data.idSubCiclo,
        idSeccion: data.idSeccion,
        idPeriodo: data.idPeriodo,
        idCarrera: data.idCarrera,
        idMateria: data.idMateria,
        idDocente: data.idDocente,
        idGrupoAnt: data.idGrupoAnt,
        idEscuela: data.idEscuela,       
      });
      this.modal = 'modificar';
      $("#modal").modal();
    }); 
  }

  public clonar(idGrupo:number){
    this.abc.getGrupo(idGrupo)
    .subscribe((data: any) => {
      this.id={idSeccion:data.idSeccion,idPeriodo:data.idPeriodo,idCarrera:data.idCarrera};
      this.periodo=this.id;
      this.grupo = this.saveGrupo();
      this.grupo.clave=data.clave;
      this.grupo.idCiclo=data.idCiclo;
      this.grupo.idSubCiclo=data.idSubCiclo;
      this.grupo.idSeccion=data.idSeccion;
      this.grupo.idPeriodo=data.idPeriodo;
      this.grupo.idCarrera=data.idCarrera;
      this.grupo.idMateria=data.idMateria;
      this.grupo.idDocente=data.idDocente;
      this.grupo.idGrupoAnt=data.idGrupo;
      this.grupo.idEscuela=data.idEscuela;
      this.abc.insertGrupo(this.grupo).subscribe(res => {
          this._success.next('Datos modificados con éxito');
          this.obtenerGruposTable();
        }, (err) => {
          console.log(err);
          this._danger.next('A ocurrido un error intentalo de nuevo');
        }
      );
    });
  }

  public onSubmit(){
    this.grupo = this.saveGrupo();
    console.log(this.grupo);
    if (this.modal=='modificar'){
      this.abc.updateGrupo(this.grupo).subscribe(res => {
        $("#modal").modal('hide');
        this._success.next('Datos actualizados con éxito');
      }, (err) => {
        console.log(err);
        this._danger.next('A ocurrido un error intentalo de nuevo');
      }
     );
    }else{
      this.abc.insertGrupo(this.grupo).subscribe(res => {
        $("#modal").modal('hide');
        this._success.next('Datos modificados con éxito');
      }, (err) => {
        console.log(err);
        this._danger.next('A ocurrido un error intentalo de nuevo');
      }
     );
    }
    this.obtenerGruposTable();
  }
  
  public changePeriodo(){
    this.asignaturaSelect=[];
    this.grupoForm.get ('idMateria') .reset (); 
    this.abc.getAsignaturasPeriodo(this.periodo.idSeccion,this.periodo.idPeriodo,this.periodo.idCarrera)
    .subscribe((data: any) => {
      for (let asignatura of data) {
        this.asignaturaSelect = [...this.asignaturaSelect, {id:asignatura.idMateria, name: asignatura.nombre}];
      }
    });
  }

  public changeCiclo(){
    this.subcicloSelect=[];
    this.grupoForm.get ('idSubCiclo') .reset (); 
    this.abc.getSubCiclos_Ciclos(this.idCiclo).subscribe((data:any) => {
      for (let subCiclo of data) {
        this.subcicloSelect = [...this.subcicloSelect, {id: subCiclo.idSubCiclo, name: subCiclo.descripcion}];
      }
    });
  }

  public inicializarForm(){
    this.grupoForm = this.pf.group({
      idGrupo: [''],
      clave:['',[Validators.required]],
      idCiclo: ['',[Validators.required]],
      idSubCiclo:['',[Validators.required]],
      idSeccion: [''],
      idPeriodo: [''],
      idCarrera: [''],
      idMateria:['',[Validators.required]],
      idDocente: ['',[Validators.required]],
      idGrupoAnt:[0],
      idEscuela: [''],
    });
   }
  public saveGrupo(){
    const saveGrupo ={
        idGrupo: this.grupoForm.get('idGrupo').value,
        clave: this.grupoForm.get('clave').value,
        idCiclo: this.grupoForm.get('idCiclo').value,
        idSubCiclo: this.grupoForm.get('idSubCiclo').value,
        idSeccion: this.periodo.idSeccion,
        idPeriodo: this.periodo.idPeriodo,
        idCarrera: this.periodo.idCarrera,
        idMateria: this.grupoForm.get('idMateria').value,
        idDocente: this.grupoForm.get('idDocente').value,
        idGrupoAnt: this.grupoForm.get('idGrupoAnt').value,
        idEscuela: this.administradorUser.idEscuela,       
    }
    return saveGrupo;
  }
  ngOnInit(): void {
    this.idUsuario=localStorage.getItem('idUsuario');
    this.abc.getAdministrador_Usuario(this.idUsuario).subscribe((data: any) => {
      this.administradorUser=data;
      this.obtenerGruposTable();
      this.abc.getCiclos(this.administradorUser.idEscuela).subscribe((data: any) => {
        for (let ciclo of data) {
          this.cicloSelect = [...this.cicloSelect, {id: ciclo.idCiclo, name: ciclo.descripcion}];
        }
      });
      this.abc.getDocenetes(this.administradorUser.idEscuela).subscribe((data:any) => {
        for (let docente of data) {
          this.docenteSelect = [...this.docenteSelect, {id: docente.idDocente, name: docente.nombre+' '+docente.apellidoP+' '+docente.apellidoM}];
        }
      });
      this.abc.getPeriodos(this.administradorUser.idEscuela).subscribe((data: any) => {
        for (let item of data) {
          this.id={idSeccion:item.idSeccion,idPeriodo:item.idPeriodo,idCarrera:item.idCarrera};
          this.periodoSelect = [...this.periodoSelect, {id:this.id, name: item.descripcion}];
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
  
  public obtenerGruposTable(){
    this.abc.getGruposTable(this.administradorUser.idEscuela)
    .subscribe((data: any) => {
      this.data=data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable();
    });
  }

}
