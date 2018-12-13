import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { AbcService } from '../abc.service';
import { Administrador } from '../modelos';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-actas-administrativo',
  templateUrl: './actas-administrativo.component.html',
  styleUrls: ['./actas-administrativo.component.css']
})
export class ActasAdministrativoComponent implements OnInit {
  modulo:string='Abrir Actas';
  modal:string;
  data:any[]=[];
  actaForm: FormGroup;
  acta: any;
  dtOptions: DataTables.Settings = {};
  dataTable: any;
  periodoSelect: any[]=[];
  periodo:any;
  id: { idSeccion: any; idPeriodo: any; idCarrera: any; };
  idUsuario: any;
  administradorUser:Administrador;
  successMessage: string;
  dangerMessage: string;
  private _success = new Subject<string>();
  private _danger = new Subject<string>();
  staticAlertClosed = false;
  constructor( private abc: AbcService, private pf: FormBuilder,private chRef: ChangeDetectorRef ) { }
  public agregar(){
    this.inicializarForm();
    this.modal = 'agregar';
    $("#modal").modal();
  }
  
  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
    this._danger.subscribe((message) => this.dangerMessage = message);
    this._danger.pipe(
      debounceTime(5000)
    ).subscribe(() => this.dangerMessage = null);
    this.idUsuario=localStorage.getItem('idUsuario');
    this.abc.getAdministrador_Usuario(this.idUsuario).subscribe((data: any) => {
      this.administradorUser=data;
      this.abc.getPeriodos(this.administradorUser.idEscuela).subscribe((data: any) => {
        for (let item of data) {
          this.id={idSeccion:item.idSeccion,idPeriodo:item.idPeriodo,idCarrera:item.idCarrera};
          this.periodoSelect = [...this.periodoSelect, {id:this.id, name: item.descripcion}];
        }
        this.obtenerActas()
      });
    });
    this.inicializarForm();
  }
  onSubmit(){
    this.acta = this.saveActa();
    console.log(this.acta);
    this.abc.insertCal(this.acta).subscribe(res => {
      this.obtenerActas();
      $("#modal").modal('hide');
      this._success.next('Datos guardados con éxito');
    }, (err) => {
      console.log(err);
      this._danger.next('A ocurrido un error intentalo de nuevo');
    }
   );
  }
  public saveActa(){
    const saveActa ={
        idConfCalificacion: this.actaForm.get('idConfCalificacion').value,
        idSeccion: this.periodo.idSeccion,
        idPeriodo: this.periodo.idPeriodo,
        idCarrera: this.periodo.idCarrera,
        fechaFin: this.actaForm.get('fechaFin').value,
        fechaIni: this.actaForm.get('fechaIni').value,
        numEvaluacion: this.actaForm.get('numEvaluacion').value,
        idEscuela:this.administradorUser.idEscuela
    }
    return saveActa;
  }
  obtenerActas(){
    this.data=[];
    this.abc.getCals(this.administradorUser.idEscuela)
    .subscribe((data: any) => {
      console.log(data);
      for (let d of data) {
        console.log(d.idSeccion);
        this.abc.getSeccion(d.idSeccion).subscribe((sec:any)=>{
          this.abc.getPeriodo(d.idPeriodo,d.idSeccion,d.idCarrera).subscribe((per:any)=>{
            this.abc.getCarrera(d.idCarrera).subscribe((carr:any)=>{
                this.data = [...this.data, {seccion:sec.descripcion, periodo: per.descripcion,carrera:carr.descripcion,numEvaluacion:d.numEvaluacion,fechaIni:d.fecahIni,fechaFin:d.fechaFin}];
                this.chRef.detectChanges();
                // Now you can use jQuery DataTables :
                const table: any = $('table');
                this.dataTable = table.DataTable();
              });

          });

        });
      }
    });
  }
  public inicializarForm(){
    this.actaForm = this.pf.group({
      idConfCalificacion:[''],
      idSeccion:[''],
      idPeriodo: [''],
      idCarrera: [''],
      fechaFin: ['',[Validators.required]],
      fechaIni: ['',[Validators.required]],
      numEvaluacion: ['',[Validators.required]],
      idEscuela:['']
    });
   }

}
