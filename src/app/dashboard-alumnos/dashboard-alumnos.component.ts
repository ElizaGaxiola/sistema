import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AbcService } from '../abc.service';

@Component({
  selector: 'app-dashboard-alumnos',
  templateUrl: './dashboard-alumnos.component.html',
  styleUrls: ['./dashboard-alumnos.component.css']
})
export class DashboardAlumnosComponent implements OnInit {
  public modulo: string = "Avisos";
  idUsuario: any;
  datos:any;
  constructor(private abc: AbcService,private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.idUsuario=localStorage.getItem('idUsuario');
    this.abc.getAlumnoUsuario(this.idUsuario).subscribe((data:any)=>{
      this.abc.getAvisosAct(data.idEscuela).subscribe((avisos:any)=>{
        console.log(avisos);
        this.datos=avisos;
      });
    });
  }

}
