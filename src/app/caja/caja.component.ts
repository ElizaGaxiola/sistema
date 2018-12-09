import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit {
  modulo: string ='Caja';
  modal:string;
  cajaForm: FormGroup;
  caja: any;
  dtOptions: DataTables.Settings = {};
  //datos para datatable
  data: any[]=[
    { cantidad: "1", concepto:"Playera", precio:"120.50"},
    { cantidad: "2", concepto:"Constancias", precio:"10.50"},
  ];
  constructor(private pf: FormBuilder) { }

  ngOnInit() {
    this.cajaForm=this.pf.group({
      idUsuario:['',[ Validators.required]],
      idAlumno:['',[ Validators.required]],
      fecha:['',[ Validators.required]],
      total:['',[ Validators.required]],
    });
  }
  onSubmit(){
    this.caja = this.saveVenta();
  }
  public agregar(){
    $("#modal").modal();
  }
  saveVenta(){
    const saveVenta={
      idUsuario: this.cajaForm.get('idUsuario').value,
      idAlumno: this.cajaForm.get('idAlumno').value,
      fecha: this.cajaForm.get('fecha').value,
      total: this.cajaForm.get('total').value,
    };
    return saveVenta;
  }



}
