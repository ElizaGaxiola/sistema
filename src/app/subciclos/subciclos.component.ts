import { Component, OnDestroy,OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Subciclo, Administrador } from '../modelos';
import { Subject } from 'rxjs';
import { AbcService } from '../abc.service';
import { debounceTime } from 'rxjs/operators';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-subciclos',
  templateUrl: './subciclos.component.html',
  styleUrls: ['./subciclos.component.css']
})
export class SubciclosComponent implements OnInit {
  bsValueFin:any;
  fecha:any;
  bsValueIni:any;
  modulo:string='Subciclos';
  modal:string;
  subcicloForm: FormGroup;
  subciclo: Subciclo;
  cicloSelect: any[]=[];
  dataTable: any;
  data: Subciclo[]=[];
  successMessage: string;
  dangerMessage: string;
  private _success = new Subject<string>();
  private _danger = new Subject<string>();
  staticAlertClosed = false;
  idUsuario: any;
  administradorUser:Administrador;
  constructor( private abc: AbcService, private pf: FormBuilder,private chRef: ChangeDetectorRef) { }
  
  public agregar(){
    this.inicializarForm();
    this.modal = 'agregar';
    $("#modal").modal();
  }

  public modificar(idCiclo:number,idSubCiclo:number){
    this.abc.getSubCiclo(idCiclo,idSubCiclo)
    .subscribe((data: any) => {
      this.fecha=data.fechaIni.split('-');
      this.bsValueIni=new Date(this.fecha[0],this.fecha[1]-1,this.fecha[2]);
      this.fecha=data.fechaFin.split('-');
      this.bsValueFin=new Date(this.fecha[0],this.fecha[1]-1,this.fecha[2]);
      this.subcicloForm=this.pf.group({
        idCiclo: data.idCiclo,
        idSubCiclo: data.idSubCiclo,
        descripcion: data.descripcion,
        fechaFin: data.fechaFin,
        fechaIni: data.fechaIni        
      });
      this.modal = 'modificar';
      $("#modal").modal();
    }); 
  }

  public obtenerSubCiclos(){
    this.abc.getSubCiclos(this.administradorUser.idEscuela)
    .subscribe((data: any) => {
      this.data=data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable();
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.idUsuario=localStorage.getItem('idUsuario');
    this.abc.getAdministrador_Usuario(this.idUsuario).subscribe((data: any) => {
      this.administradorUser=data;
      this.abc.getCiclos(this.administradorUser.idEscuela).subscribe((data: any) => {
        for (let ciclo of data) {
          this.cicloSelect = [...this.cicloSelect, {id: ciclo.idCiclo, name: ciclo.descripcion}];
        }
      });
      this.obtenerSubCiclos();
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
    this.subciclo = this.saveSubciclo();
    if (this.modal=='modificar'){
      this.abc.updateSubCiclo(this.subciclo).subscribe(res => {
        this.obtenerSubCiclos();
        this._success.next('Datos modificados con éxito');
        $("#modal").modal('hide');
      }, (err) => {
        this._danger.next('A ocurrido un error intentalo de nuevo');
        console.log(err);
      }
     );
    }else{
      this.abc.insertSubCiclo(this.subciclo).subscribe(res => {
        this.obtenerSubCiclos();
        this._success.next('Datos Agregados con éxito');
        $("#modal").modal('hide');
      }, (err) => {
        this._danger.next('A ocurrido un error intentalo de nuevo');
        console.log(err);
      }
     );
    }
  }
  public saveSubciclo(){
    const saveSubciclo ={
        idCiclo: this.subcicloForm.get('idCiclo').value,
        idSubCiclo: this.subcicloForm.get('idSubCiclo').value,
        descripcion: this.subcicloForm.get('descripcion').value,
        fechaFin: this.subcicloForm.get('fechaFin').value,
        fechaIni: this.subcicloForm.get('fechaIni').value, 
    }
    return saveSubciclo;
  }
  public inicializarForm(){
    this.subcicloForm = this.pf.group({
      idCiclo: ['',[Validators.required]],
      idSubCiclo: [''],
      descripcion: ['',[Validators.required]],
      fechaFin: ['',[Validators.required]],
      fechaIni: ['',[Validators.required]],
    });
   }

}
