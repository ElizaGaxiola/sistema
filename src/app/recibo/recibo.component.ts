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
  constructor(private _route: ActivatedRoute,private abc: AbcService) { 
    console.log(this._route.snapshot.paramMap.get('id'));
    this.idCandidato = Number(this._route.snapshot.paramMap.get('id'));
    this.abc.getCandidato(this.idCandidato).subscribe((data:any)=>{
      console.log(data);
    });
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
