import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import { ActivatedRoute } from '@angular/router';
import { AbcService } from '../abc.service';
@Component({
  selector: 'app-recibo',
  templateUrl: './recibo.component.html',
  styleUrls: ['./recibo.component.css']
})
export class ReciboComponent  {
  @ViewChild('content') content: ElementRef
  idCandidato:number;
  nombreCan:string;
  nombreEsc:string;
  nombreCar:String;
  importe:number;
  ref:string;
  f = new Date();

  constructor(private _route: ActivatedRoute,private abc: AbcService) { 
    console.log(this._route.snapshot.paramMap.get('id'));
    this.idCandidato = Number(this._route.snapshot.paramMap.get('id'));
    this.abc.getCandidato(this.idCandidato).subscribe((data:any)=>{
      this.obtenerRef(data);
      this.nombreCan = data.nombre + ' ' + data.apellidoP + ' ' + data.apellidoM;
      this.abc.getEscuela_Id(data.idEscuela).subscribe((escuela:any)=>{
        this.nombreEsc = escuela.nombre;
      });
      this.abc.getCarrera(data.idCarrera).subscribe((carrera:any)=>{
        this.nombreCar=carrera.descripcion;
        this.importe = carrera.precio;
      });
    });
  }

  public obtenerRef(data:any){
    let escuela = data.idEscuela.toString();
    if(escuela<10) {
      escuela='0'+escuela;
    } 
    let carrera = data.idCarrera.toString();
    if(carrera<10) {
      carrera='0'+ carrera;
    }
    let dd = this.f.getDate().toString();
    if(Number(dd) < 10) {
      dd ='0'+dd;
    }  
    let mm = (this.f.getMonth()+1).toString();
    if(Number(mm) < 10) {
      mm ='0'+mm;
    }  
    this.ref = (escuela + carrera + dd + mm + this.f.getFullYear());
    for (var _i = 0; _i < 9; _i++) {
      this.ref = this.ref + Math.floor(Math.random() * 10);
    }
    console.log(this.ref);
  }

  public downloadPDF(){
    let doc = new jsPDF();

    let specialElementHandlers={
      '#editor': function(element, renderer ){
        return true;
      }
    };

    let content= this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      'width': 190, specialElementHandlers
    });

    doc.save('recibo.pdf')
  }

}
