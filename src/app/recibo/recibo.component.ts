import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-recibo',
  templateUrl: './recibo.component.html',
  styleUrls: ['./recibo.component.css']
})
export class ReciboComponent  {
  @ViewChild('content') content: ElementRef

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
