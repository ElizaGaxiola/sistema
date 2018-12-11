import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
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
  actaForm: FormGroup;
  acta: any;
  dtOptions: DataTables.Settings = {};
  dataTable: any;
  constructor(private pf: FormBuilder) { }
  public agregar(){
    this.inicializarForm();
    this.modal = 'agregar';
    $("#modal").modal();
  }
  ngOnInit() {

  }
  onSubmit(){
    this.acta = this.saveActa();
  }
  public saveActa(){
    const saveActa ={
        idPeriodo: this.actaForm.get('idPeriodo').value,
        idCarrera: this.actaForm.get('idCarrera').value,
        fechaFin: this.actaForm.get('fechaFin').value,
        fechaIni: this.actaForm.get('fechaIni').value,
        numEvaluacion: this.actaForm.get('numEvaluacion').value,
    }
    return saveActa;
  }
  public inicializarForm(){
    this.actaForm = this.pf.group({
      idPeriodo: ['',[Validators.required]],
      idCarrera: ['',[Validators.required]],
      fechaFin: ['',[Validators.required]],
      fechaIni: ['',[Validators.required]],
      numEvaluacion: ['',[Validators.required]],
    });
   }

}
