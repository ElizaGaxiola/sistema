import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import { ActivatedRoute } from '@angular/router';
import { AbcService } from '../abc.service';

@Component({
  selector: 'app-reciboreinscripcion',
  templateUrl: './reciboreinscripcion.component.html',
  styleUrls: ['./reciboreinscripcion.component.css']
})
export class ReciboreinscripcionComponent { 
  @ViewChild('content') content: ElementRef
  idAlumno:number;
  idCiclo:number;
  idCarrera:number;
  nombreCan:string;
  nombreEsc:string;
  nombreCar:String;
  importe:number;
  ref:string;
  ciclo:string='';
  f = new Date();

  constructor(private _route: ActivatedRoute,private abc: AbcService) { 
    this.idAlumno = Number(this._route.snapshot.paramMap.get('idA'));
    this.idCiclo = Number(this._route.snapshot.paramMap.get('idCi'));
    this.idCarrera = Number(this._route.snapshot.paramMap.get('idCa'));
    this.abc.getAlumno(this.idAlumno).subscribe((data:any)=>{
      this.obtenerRef(data);
      this.nombreCan = data.nombre + ' ' + data.apellidoP + ' ' + data.apellidoM;
      this.abc.getEscuela_Id(data.idEscuela).subscribe((escuela:any)=>{
        this.nombreEsc = escuela.nombre;
      });
      this.abc.getCarrera(this.idCarrera).subscribe((carrera:any)=>{
        this.nombreCar=carrera.descripcion;
        this.importe = carrera.precio;
      });
    });
    this.abc.getCiclo(this.idCiclo).subscribe((data:any)=>
    {
      this.ciclo=data.descripcion;
    });
  }

  public obtenerRef(data:any){
    let escuela = data.idEscuela.toString();
    if(Number(escuela)<10) {
      escuela='0'+escuela;
    } 
    let carrera = this.idCarrera.toString();
    if(Number(carrera)<10) {
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
